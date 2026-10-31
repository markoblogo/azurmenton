/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require("node:fs/promises");
const {createHash,randomUUID}=require("node:crypto");
const path=require("node:path");
const {execFileSync}=require("node:child_process");
const digest=value=>createHash("sha256").update(value).digest("hex");
async function fileHash(file){return digest(await fs.readFile(file));}
async function artifactHash(file){
  const stat=await fs.lstat(file);
  if(stat.isSymbolicLink())throw Error("Generated artifacts must not be symlinks");
  if(stat.isFile())return fileHash(file);
  if(!stat.isDirectory())throw Error("Unsupported generated artifact");
  const entries=[];
  for(const name of (await fs.readdir(file)).sort())entries.push([name,await artifactHash(path.join(file,name))]);
  return digest(JSON.stringify(entries));
}
async function json(file){try{return JSON.parse(await fs.readFile(file,"utf8"));}catch(error){if(error.code==="ENOENT")return null;throw error;}}
async function saveJson(file,value){await fs.mkdir(path.dirname(file),{recursive:true});const temporary=file+"."+randomUUID()+".tmp";try{await fs.writeFile(temporary,JSON.stringify(value,null,2)+"\n",{flag:"wx"});await fs.rename(temporary,file);}finally{await fs.rm(temporary,{force:true});}}
async function artifacts(paths=[]){const result={};for(const file of paths){try{result[file]=await artifactHash(file);}catch(error){if(error.code!=="ENOENT")throw error;result[file]=null;}}return result;}

async function runCheckSuite({receiptPath,checks,fingerprint,execute,onStep=()=>{}}){
  onStep("fingerprint","running");
  const inputHash=await fingerprint();
  onStep("fingerprint","passed");
  const signature=digest(JSON.stringify(checks));
  const previous=await json(receiptPath);
  const compatible=previous?.version===1&&!previous.stale&&previous.fingerprint===inputHash&&previous.signature===signature;
  const receipt={version:1,fingerprint:inputHash,signature,startedAt:new Date().toISOString(),ok:false,publication:"not-performed",plannedChecks:checks.map(x=>x.id),checks:[]};
  for(const check of checks){
    if(!/^[a-z0-9-]+$/.test(check.id))throw Error("Invalid check id");
    const logPath=path.join(path.dirname(receiptPath),"logs",`${check.id}.log`);
    const cached=compatible&&!check.alwaysRun?previous.checks.find(x=>x.id===check.id&&x.status==="passed"):null;
    let reusable=false;
    if(cached&&cached.logPath===logPath){try{reusable=await fileHash(logPath)===cached.logHash&&JSON.stringify(await artifacts(check.artifacts))===JSON.stringify(cached.artifacts);}catch{reusable=false;}}
    if(reusable){receipt.checks.push({...cached,reused:true});onStep(check.id,"reused");}
    else{
      onStep(check.id,"running");
      const started=Date.now();
      let result;
      try{result=await execute(check);}catch(error){result={code:1,output:error.message};}
      const outputs=await artifacts(check.artifacts);
      if(result.code===0&&Object.values(outputs).some(x=>x===null))result={code:1,output:`${result.output}\nRequired build artifact missing`};
      await fs.mkdir(path.dirname(logPath),{recursive:true});
      await fs.writeFile(logPath,String(result.output??""));
      receipt.checks.push({id:check.id,status:result.code===0?"passed":"failed",exitCode:result.code,durationMs:Date.now()-started,logPath,logHash:await fileHash(logPath),artifacts:outputs,reused:false});
      onStep(check.id,result.code===0?"passed":"failed");
    }
    await saveJson(receiptPath,receipt);
    if(receipt.checks.at(-1).status!=="passed")break;
  }
  receipt.stale=await fingerprint()!==inputHash;
  receipt.ok=!receipt.stale&&receipt.checks.length===checks.length&&receipt.checks.every(x=>x.status==="passed");
  receipt.finishedAt=new Date().toISOString();
  await saveJson(receiptPath,receipt);
  return receipt;
}

async function fingerprintInputs(root,paths){
  const sorted=[...new Set(paths)].sort();
  const entries=new Array(sorted.length);
  let next=0;
  async function worker(){
    while(next<sorted.length){
      const index=next++;
      const file=sorted[index];
      try{
        const stat=await fs.lstat(file);
        if(stat.isSymbolicLink())throw Error(`Refusing symlink input: ${path.relative(root,file)}`);
        if(!stat.isFile())continue;
        entries[index]=[path.relative(root,file),await fileHash(file)];
      }catch(error){if(error.code!=="ENOENT")throw error;entries[index]=[path.relative(root,file),"missing"];}
    }
  }
  // Bound IO concurrency without replacing content hashes with timestamps.
  await Promise.all(Array.from({length:Math.min(8,sorted.length)},()=>worker()));
  return entries.filter(Boolean);
}

async function repositoryFingerprint(root,extraFiles=[]){
  const listed=execFileSync("git",["ls-files","-z","--cached","--others","--exclude-standard"],{cwd:root,encoding:"utf8",maxBuffer:20_000_000}).split("\0").filter(Boolean);
  const generated=/^(?:build|\.next|node_modules|coverage|test-results)(?:\/|$)|(?:^|\/)__pycache__(?:\/|$)/;
  const paths=new Set(listed.filter(file=>!generated.test(file)).map(file=>path.join(root,file)));
  for(const file of await fs.readdir(root))if(/^\.env(?:\.|$)/.test(file))paths.add(path.join(root,file));
  for(const file of extraFiles)paths.add(path.resolve(file));
  const entries=await fingerprintInputs(root,paths);
  const volatile=new Set(["_","SHLVL","PWD","OLDPWD","npm_lifecycle_event","npm_lifecycle_script","npm_command","INIT_CWD"]);
  const environment=Object.entries(process.env).filter(([key])=>!volatile.has(key)).sort(([a],[b])=>a.localeCompare(b));
  const asOf=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Paris",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
  return digest(JSON.stringify({asOf,node:process.version,platform:process.platform,arch:process.arch,environment:digest(JSON.stringify(environment)),inputs:entries}));
}
module.exports={digest,fileHash,json,saveJson,runCheckSuite,repositoryFingerprint,fingerprintInputs};
