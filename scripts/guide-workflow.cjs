#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require("node:fs/promises");
const path=require("node:path");
const {execFileSync}=require("node:child_process");
const {fileHash,json,saveJson,runCheckSuite,repositoryFingerprint}=require("./lib/guide-workflow.cjs");
const root=path.resolve(__dirname,"..");
require("./lib/register-ts-content.cjs").registerTypescriptContent(root);
const {guideArticles}=require("../src/content/guide.ts");
const {extractGuideIntake,normalizePlainTextGuide}=require("../src/lib/guide-intake.ts");
const packageFiles=["draft-original.txt","draft.md","draft-body.md","intake.json","publication-plan.json","structure.json","link-plan-report.json","check-report.json","assets-report.json","apply/guide-article.snippet.txt","apply/places-raw.snippet.txt","apply/place-visuals.snippet.txt","apply/integration-checklist.md","publish-report.json","patch/summary.json","patch/content-bundle.md","patch/existing-place-updates.json"];
const options=new Set(["--slug","--from","--cover","--assets-dir"]);

function parseArgs(args){
  const [stage,...rest]=args;
  if(!["prepare","bundle","check","assets"].includes(stage))throw Error("Usage: guide:workflow -- prepare --from <file> [--cover <file>] | bundle/check --slug <intake-slug> | assets --slug <intake-slug> --assets-dir <folder> [--cover <file>]. check accepts --webpack.");
  const result={stage};
  for(let i=0;i<rest.length;i++){
    const flag=rest[i];
    if(flag==="--webpack"&&stage==="check"){result.webpack=true;continue;}
    if(!options.has(flag)||!rest[i+1]||rest[i+1].startsWith("--")||result[flag.slice(2)]!==undefined)throw Error(`Invalid/repeated option: ${flag}`);
    result[flag.slice(2)]=rest[++i];
  }
  if(stage==="prepare"&&!result.from)throw Error("prepare requires --from");
  if(stage!=="prepare"&&(!result.slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result.slug)))throw Error("A safe intake --slug is required");
  if(stage==="assets"&&!result["assets-dir"])throw Error("assets requires --assets-dir");
  const allowed={prepare:["from","cover"],bundle:["slug"],check:["slug","webpack"],assets:["slug","assets-dir","cover"]}[stage];
  for(const key of Object.keys(result))if(key!=="stage"&&!allowed.includes(key))throw Error(`Option ${key} is not valid for ${stage}`);
  return result;
}
function execute(argv){
  try{return {code:0,output:execFileSync(argv[0],argv.slice(1),{cwd:root,encoding:"utf8",timeout:1_800_000,maxBuffer:20_000_000,env:process.env})};}
  catch(error){return {code:typeof error.status==="number"?error.status:1,output:`${error.stdout??""}${error.stderr??""}\n${error.signal??error.message}`};}
}
const nodeStep=(id,script,args=[])=>({id,argv:[process.execPath,path.join(root,"scripts",script),...args]});

async function recordStep(directory,step){
  console.log(`${step.id}: running`);
  const result=execute(step.argv);
  const log=path.join(directory,"workflow/logs",`${step.id}.log`);
  await fs.mkdir(path.dirname(log),{recursive:true});await fs.writeFile(log,result.output);
  return {id:step.id,exitCode:result.code,log:path.relative(directory,log),logHash:await fileHash(log)};
}
async function sourceDescriptor(file){
  const resolved=path.resolve(file);if((await fs.lstat(resolved)).isSymbolicLink())throw Error("Source symlinks are not accepted");
  return {path:resolved,sha256:await fileHash(resolved)};
}
async function verifySource(descriptor){
  if(await fileHash(descriptor.path)!==descriptor.sha256)throw Error("Frozen source changed; review before continuing");
  if(descriptor.originalPath){try{if(await fileHash(descriptor.originalPath)!==descriptor.sha256)throw Error("Original source changed; review before continuing");}catch(error){if(error.code!=="ENOENT")throw error;}}
}
async function makePacket(directory,source,steps){
  const intake=await json(path.join(directory,"intake.json"));
  const plan=await json(path.join(directory,"publication-plan.json"));
  if(!intake||!plan)throw Error("Missing intake or publication plan");
  const files=[];
  for(const relative of packageFiles){
    const absolute=path.join(directory,relative);
    try{files.push({path:relative,sha256:await fileHash(absolute)});}catch(error){if(error.code!=="ENOENT")throw error;}
  }
  const publish=await json(path.join(directory,"publish-report.json"));
  const patch=await json(path.join(directory,"patch/summary.json"));
  const slug=plan.slug||intake.slug;
  const failedSteps=steps.filter(step=>step.exitCode!==0);
  const insertionReady=Boolean(publish?.ready&&patch?.ready&&!failedSteps.length&&["match","structure","links","check","apply","readiness","patch"].every(id=>steps.some(step=>step.id===id)));
  const packet={version:1,intakeSlug:path.basename(directory),publicSlug:slug,createdAt:new Date().toISOString(),source,files,steps,
    insertionReady,
    sourceFactsVerified:"not-inferred",translations:"manual-review-required",approval:"not-inferred",publication:"not-performed",
    sourcePresentInRepository:guideArticles.some(guide=>guide.slug===slug),
    blockers:[...failedSteps.map(step=>({code:"workflow-step-failed",message:`${step.id} failed; inspect ${step.log}`})),...(publish?.blockers??[]),...(patch?.blockers??[])],
    imagePolicy:"Post-publication illustrations remain supported; missing place images do not imply permission to reuse another image.",
    nextAction:insertionReady?"Review translations and facts, insert the complete patch manually, then run check. This is not approval to publish.":"Resolve the reported content/cover/map/link obligations and rerun bundle; no website publication has occurred."};
  await saveJson(path.join(directory,"workflow/packet.json"),packet);
  await fs.writeFile(path.join(directory,"workflow/operator.md"),`# Manual guide packet: ${slug}\n\nInsertion-ready: ${packet.insertionReady}\nPublication: not performed\nApproval: not inferred\n\n${packet.nextAction}\n\nPatch: ../patch/content-bundle.md\nChecks: npm run guide:workflow -- check --slug ${packet.intakeSlug}\nPost-publish images: npm run guide:workflow -- assets --slug ${packet.intakeSlug} --assets-dir /absolute/path\n`);
  return packet;
}
async function loadPacket(directory){
  const packet=await json(path.join(directory,"workflow/packet.json"));
  if(packet?.version!==1||packet.intakeSlug!==path.basename(directory)||!Array.isArray(packet.files))throw Error("Run prepare/bundle first");
  for(const file of packet.files){
    if(!packageFiles.includes(file.path)||await fileHash(path.join(directory,file.path))!==file.sha256)throw Error("Packet inputs changed; rerun bundle before checks");
  }
  for(const descriptor of Object.values(packet.source??{}))await verifySource(descriptor);
  return packet;
}
async function bundle(directory,source){
  const slug=path.basename(directory);
  const steps=[];
  for(const [id,file] of [["match","guide-match.cjs"],["structure","guide-structure.cjs"],["links","guide-link-plan.cjs"],["check","guide-check.cjs"],["apply","guide-apply.cjs"],["readiness","guide-publish.cjs"],["patch","guide-patch.cjs"]]){
    const result=await recordStep(directory,nodeStep(id,file,["--slug",slug]));steps.push(result);
    // Readiness failures are expected editorial blockers, not permission to ignore missing output.
    if(result.exitCode&&!["check","readiness","patch"].includes(id))break;
  }
  return makePacket(directory,source,steps);
}
async function main(args=process.argv.slice(2)){
  const opts=parseArgs(args);
  let directory;
  if(opts.stage==="prepare"){
    const source={document:await sourceDescriptor(opts.from)};
    if(opts.cover)source.cover=await sourceDescriptor(opts.cover);
    const original=path.extname(opts.from).toLowerCase()===".docx"?execFileSync("python3",[path.join(root,"scripts/lib/docx-to-markdown.py"),source.document.path],{encoding:"utf8",maxBuffer:20_000_000}):await fs.readFile(source.document.path,"utf8");
    const intake=extractGuideIntake(normalizePlainTextGuide(original));
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(intake.slug))throw Error("Intake produced an unsafe slug");
    directory=path.join(root,"build/guide-intake",intake.slug);
    try{await fs.access(directory);throw Error(`Intake already exists: ${intake.slug}; use bundle, do not overwrite editorial choices`);}catch(error){if(error.code!=="ENOENT")throw error;}
    const result=execute([process.execPath,path.join(root,"scripts/guide-new.cjs"),"--from",source.document.path,...(opts.cover?["--cover",source.cover.path]:[])]);
    if(result.code)throw Error(result.output);
    const originals=path.join(directory,"workflow/originals");await fs.mkdir(originals,{recursive:true});
    for(const [kind,descriptor] of Object.entries(source)){
      const frozen=path.join(originals,kind+path.extname(descriptor.path).toLowerCase());
      await fs.copyFile(descriptor.path,frozen,require("node:fs").constants.COPYFILE_EXCL);
      if(await fileHash(frozen)!==descriptor.sha256)throw Error("Source changed while freezing the packet; review before continuing");
      source[kind]={...descriptor,originalPath:descriptor.path,path:frozen};
    }
    if(opts.cover){
      const frozenIntake=await json(path.join(directory,"intake.json"));
      const frozenPlan=await json(path.join(directory,"publication-plan.json"));
      await saveJson(path.join(directory,"intake.json"),{...frozenIntake,coverPathHint:source.cover.path});
      await saveJson(path.join(directory,"publication-plan.json"),{...frozenPlan,coverAssetPath:source.cover.path,coverAssetFileName:path.basename(source.cover.path)});
      const coverStep=await recordStep(directory,nodeStep("cover","guide-assets.cjs",["--slug",intake.slug,"--cover",source.cover.path,"--missing-only"]));
      if(coverStep.exitCode)throw Error(`Cover processing failed; inspect ${coverStep.log}. Existing intake was retained.`);
    }
    const packet=await bundle(directory,source);console.log(`Packet: ${path.relative(root,directory)}/workflow/packet.json; insertion-ready: ${packet.insertionReady}; publication: NOT PERFORMED`);return packet.insertionReady;
  }
  directory=path.join(root,"build/guide-intake",opts.slug);
  if(opts.stage==="bundle"){
    const old=await json(path.join(directory,"workflow/packet.json"));
    for(const descriptor of Object.values(old?.source??{}))await verifySource(descriptor);
    const packet=await bundle(directory,old?.source??{});console.log(`Packet: ${path.relative(root,directory)}/workflow/packet.json; insertion-ready: ${packet.insertionReady}; publication: NOT PERFORMED`);return packet.insertionReady;
  }
  const packet=await loadPacket(directory);
  if(opts.stage==="assets"){
    const published=guideArticles.some(guide=>guide.slug===packet.publicSlug);
    const argv=[...(published?["--published-guide",packet.publicSlug,"--apply-places-patch-safe"]:["--slug",opts.slug]),"--assets-dir",path.resolve(opts["assets-dir"]),"--missing-only",...(opts.cover?["--cover",path.resolve(opts.cover),...(published?["--apply-cover-patch-safe"]:[])]:[])];
    const step=await recordStep(directory,nodeStep("assets","guide-assets.cjs",argv));
    if(step.exitCode===0)await makePacket(directory,packet.source,[...packet.steps,step]);
    await saveJson(path.join(directory,"workflow/asset-pass.json"),{version:1,publicSlug:packet.publicSlug,step,publication:"not-performed",nextAction:"Run check again on the changed final tree; then seek publication approval. Existing images are not replaced."});
    console.log(`Asset pass: ${step.exitCode===0?"applied locally":"failed"}; run check; no commit/push/deploy performed.`);return step.exitCode===0;
  }
  const guide=guideArticles.find(guide=>guide.slug===packet.publicSlug);
  if(!guide?.coverImage)throw Error("Insert the reviewed guide and cover before running final checks");
  for(const field of ["title","seoTitle","seoDescription","excerpt"]){if(["en","fr","it","uk"].some(locale=>typeof guide[field]?.[locale]!=="string"||!guide[field][locale].trim()))throw Error(`Missing ${field} translation`);}
  const npm=script=>[process.platform==="win32"?"npm.cmd":"npm","run",script];
  const checks=[{...nodeStep("guide-review","guide-review.cjs",["--slug",opts.slug]),artifacts:[path.join(directory,"review/report.json"),path.join(directory,"review/owner-checklist.md")]},...[["lint","lint"],["typecheck","typecheck"],["unit","test"],["preflight","preflight"],["images","images:check"]].map(([id,script])=>({id,argv:npm(script)})),
    {id:"build",argv:[...npm("build"),...(opts.webpack?["--","--webpack"]:[])],artifacts:[path.join(root,".next/BUILD_ID"),path.join(root,".next/build-manifest.json"),path.join(root,"public/pagefind")]},
    {id:"postbuild",argv:npm("preflight:postbuild"),artifacts:[path.join(root,".next/BUILD_ID")]}];
  const receipt=await runCheckSuite({receiptPath:path.join(directory,"workflow/checks.json"),checks,
    fingerprint:()=>repositoryFingerprint(root,[...packet.files.map(file=>path.join(directory,file.path)),...Object.values(packet.source??{}).map(source=>source.path)]),
    execute:check=>execute(check.argv),onStep:(id,status)=>console.log(`${id}: ${status}`)});
  console.log(`Checks: ${receipt.ok?"PASS":"FAILED/STALE"}; receipt: ${path.relative(root,directory)}/workflow/checks.json; approval and production verification remain separate.`);
  return receipt.ok;
}
module.exports={parseArgs,main};
if(require.main===module)main().then(ok=>{if(!ok)process.exitCode=1;}).catch(error=>{console.error(`guide:workflow: ${error.message}`);process.exitCode=1;});
