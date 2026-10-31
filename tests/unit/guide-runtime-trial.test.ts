import { describe,it,expect } from "vitest";
import { createRequire } from "node:module";
import { mkdtemp,rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
const require=createRequire(import.meta.url);
const {createTrialStore}=require("../../scripts/lib/guide-runtime-trial.cjs");
const {digest}=require("../../scripts/lib/guide-workflow.cjs");
const guide={slug:"trial-guide",title:{en:"Trial",fr:"Essai",it:"Prova",uk:"Проба"},sections:[]};
describe("isolated guide runtime trial, not a production store",()=>{
  it("publishes once, replays retries, rejects stale writes and persists the snapshot",async()=>{
    const directory=await mkdtemp(path.join(tmpdir(),"guide-runtime-"));
    try{
      const store=createTrialStore(directory);
      const op={requestId:"publish-1",expectedRevision:0,kind:"publish",guide,places:[{id:"trial-place",name:"Place"}]};
      expect(await store.apply(op)).toMatchObject({revision:1,status:"stored-local-only"});
      expect(await store.apply(op)).toMatchObject({revision:1,replayed:true});
      await expect(store.apply({...op,requestId:"publish-2"})).rejects.toThrow(/revision/);
      await expect(store.apply({...op,guide:{...guide,title:{...guide.title,en:"Changed"}}})).rejects.toThrow(/request ID/);
      expect((await createTrialStore(directory).read()).revision).toBe(1);
    }finally{await rm(directory,{recursive:true,force:true});}
  });
  it("adds a validated image after publication without changing authored guide content",async()=>{
    const directory=await mkdtemp(path.join(tmpdir(),"guide-runtime-image-"));
    try{
      const store=createTrialStore(directory);
      await store.apply({requestId:"publish",expectedRevision:0,kind:"publish",guide,places:[{id:"trial-place",name:"Place"}]});
      const bytes=await sharp({create:{width:2,height:2,channels:3,background:"white"}}).png().toBuffer();
      const media={base64:bytes.toString("base64"),sha256:digest(bytes),extension:"png"};
      const operation={requestId:"image",expectedRevision:1,kind:"set-place-image",placeId:"trial-place",media};
      await expect(store.apply({...operation,placeId:"unknown-place"})).rejects.toThrow(/Unknown/);
      await expect(store.apply({...operation,media:{...media,sha256:"bad"}})).rejects.toThrow(/hash/);
      expect(await store.apply(operation)).toMatchObject({revision:2});
      const after=await createTrialStore(directory).read();
      expect(after.guide).toEqual(guide);expect(after.places[0].image).toBe(`/media/${media.sha256}.png`);
      await expect(store.apply({...operation,requestId:"replace",expectedRevision:2})).rejects.toThrow(/not replaced/);
    }finally{await rm(directory,{recursive:true,force:true});}
  });
  it("fails closed if stored bytes are corrupted",async()=>{
    const directory=await mkdtemp(path.join(tmpdir(),"guide-runtime-corrupt-"));
    try{
      const store=createTrialStore(directory);
      await store.apply({requestId:"publish",expectedRevision:0,kind:"publish",guide,places:[]});
      const fs=await import("node:fs/promises");
      const state=JSON.parse(await fs.readFile(path.join(directory,"snapshot.json"),"utf8"));state.snapshot.revision=99;
      await fs.writeFile(path.join(directory,"snapshot.json"),JSON.stringify(state));
      await expect(store.read()).rejects.toThrow(/checksum/);
    }finally{await rm(directory,{recursive:true,force:true});}
  });
});
