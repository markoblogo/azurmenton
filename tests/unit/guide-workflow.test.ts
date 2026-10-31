import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const { runCheckSuite,repositoryFingerprint } = createRequire(import.meta.url)("../../scripts/lib/guide-workflow.cjs");

describe("manual guide workflow receipts", () => {
  it("reuses actual successful checks only for the identical inputs and intact logs", async () => {
    const root=await mkdtemp(path.join(tmpdir(),"guide-workflow-"));
    try {
      let calls=0;
      const checks=[{id:"review",argv:["review"]},{id:"tests",argv:["test"]}];
      const receiptPath=path.join(root,"receipt.json");
      const options={receiptPath,checks,fingerprint:async()=>"tree-a",execute:async()=>{calls++;return {code:0,output:"actual test output"};}};
      const first=await runCheckSuite(options);
      expect(first.ok).toBe(true);
      expect(calls).toBe(2);
      expect((await runCheckSuite(options)).checks.every((x:{reused:boolean})=>x.reused)).toBe(true);
      expect(calls).toBe(2);
      await writeFile(first.checks[0].logPath,"tampered log");
      await runCheckSuite(options);
      expect(calls).toBe(3);
      await runCheckSuite({...options,fingerprint:async()=>"tree-b"});
      expect(calls).toBe(5);
      const receipt=JSON.parse(await readFile(receiptPath,"utf8"));
      expect(receipt.fingerprint).toBe("tree-b");
      expect(receipt).toMatchObject({ok:true,publication:"not-performed"});
    } finally { await rm(root,{recursive:true,force:true}); }
  });
  it("does not reuse a failed check or claim checks skipped after failure passed",async()=>{
    const root=await mkdtemp(path.join(tmpdir(),"guide-workflow-failure-"));
    try{
      let calls=0,fail=true;
      const options={receiptPath:path.join(root,"receipt.json"),checks:[{id:"first",argv:["a"]},{id:"second",argv:["b"]}],fingerprint:async()=>"same",execute:async()=>{calls++;return {code:fail?1:0,output:"result"};}};
      const failed=await runCheckSuite(options);
      expect(failed.ok).toBe(false);expect(failed.checks).toHaveLength(1);
      fail=false;expect((await runCheckSuite(options)).ok).toBe(true);expect(calls).toBe(3);
    }finally{await rm(root,{recursive:true,force:true});}
  });
  it("invalidates the whole receipt if inputs change during checks",async()=>{
    const root=await mkdtemp(path.join(tmpdir(),"guide-workflow-stale-"));
    try{
      let value="before";
      const result=await runCheckSuite({receiptPath:path.join(root,"receipt.json"),checks:[{id:"tests",argv:["test"]}],fingerprint:async()=>value,execute:async()=>{value="after";return {code:0,output:"passed against changing inputs"};}});
      expect(result).toMatchObject({ok:false,stale:true});
    }finally{await rm(root,{recursive:true,force:true});}
  });
  it("reruns builds when generated build artifacts are missing",async()=>{
    const root=await mkdtemp(path.join(tmpdir(),"guide-workflow-build-"));
    try{
      let calls=0;const artifact=path.join(root,"BUILD_ID");
      const options={receiptPath:path.join(root,"receipt.json"),checks:[{id:"build",argv:["build"],artifacts:[artifact]}],fingerprint:async()=>"same",execute:async()=>{calls++;await writeFile(artifact,"build-a");return {code:0,output:"built"};}};
      await runCheckSuite(options);await rm(artifact);await runCheckSuite(options);expect(calls).toBe(2);
    }finally{await rm(root,{recursive:true,force:true});}
  });
  it("invalidates a cached build when a generated search fragment changes",async()=>{
    const root=await mkdtemp(path.join(tmpdir(),"guide-workflow-index-"));
    try{
      const fs=await import("node:fs/promises");const index=path.join(root,"pagefind");await fs.mkdir(index);
      let calls=0;
      const options={receiptPath:path.join(root,"receipt.json"),checks:[{id:"build",argv:["build"],artifacts:[index]}],fingerprint:async()=>"same",execute:async()=>{calls++;await writeFile(path.join(index,"fragment"),"valid index");return {code:0,output:"built"};}};
      await runCheckSuite(options);await writeFile(path.join(index,"fragment"),"stale index");await runCheckSuite(options);expect(calls).toBe(2);
    }finally{await rm(root,{recursive:true,force:true});}
  });
  it("fingerprints real source and environment changes without retaining secret values",async()=>{
    const root=await mkdtemp(path.join(tmpdir(),"guide-workflow-fingerprint-"));
    const previous=process.env.GUIDE_WORKFLOW_TEST_SECRET;
    try{
      execFileSync("git",["init","-q"],{cwd:root});await writeFile(path.join(root,"source.md"),"one");
      process.env.GUIDE_WORKFLOW_TEST_SECRET="first-private-value";
      const first=await repositoryFingerprint(root);expect(first).toMatch(/^[a-f0-9]{64}$/);
      expect(await repositoryFingerprint(root)).toBe(first);
      process.env.GUIDE_WORKFLOW_TEST_SECRET="second-private-value";
      expect(await repositoryFingerprint(root)).not.toBe(first);
      process.env.GUIDE_WORKFLOW_TEST_SECRET="first-private-value";
      await writeFile(path.join(root,"source.md"),"two");expect(await repositoryFingerprint(root)).not.toBe(first);
    }finally{if(previous===undefined)delete process.env.GUIDE_WORKFLOW_TEST_SECRET;else process.env.GUIDE_WORKFLOW_TEST_SECRET=previous;await rm(root,{recursive:true,force:true});}
  });
});
