/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require("node:fs/promises");
const path=require("node:path");
const {randomUUID}=require("node:crypto");
const {digest,json}=require("./guide-workflow.cjs");
const safeId=value=>typeof value==="string"&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

function createTrialStore(directory){
  if(process.env.VERCEL)throw Error("Local runtime trial is prohibited on Vercel");
  const stateFile=path.join(directory,"snapshot.json");
  async function read(){
    const envelope=await json(stateFile);
    if(!envelope)return {version:1,revision:0,guide:null,places:[],requests:{}};
    if(digest(JSON.stringify(envelope.snapshot))!==envelope.sha256)throw Error("Trial snapshot checksum failed");
    return envelope.snapshot;
  }
  async function apply(operation){
    if(!operation||!Number.isSafeInteger(operation.expectedRevision)||operation.expectedRevision<0||!['publish','set-place-image'].includes(operation.kind)||typeof operation.requestId!=="string"||!/^[a-z0-9][a-z0-9._-]{0,63}$/i.test(operation.requestId))throw Error("Invalid trial operation");
    const serialized=JSON.stringify(operation);
    if(Buffer.byteLength(serialized)>4_000_000)throw Error("Trial operation too large");
    await fs.mkdir(directory,{recursive:true});
    if((await fs.lstat(directory)).isSymbolicLink())throw Error("Trial directory must not be a symlink");
    const lock=path.join(directory,"write.lock");
    let handle;
    try{handle=await fs.open(lock,"wx");}catch(error){if(error.code==="EEXIST")throw Error("Trial revision is being changed; inspect and retry");throw error;}
    try{
      const current=await read();const hash=digest(serialized);
      if(Object.hasOwn(current.requests,operation.requestId)){
        const previous=current.requests[operation.requestId];
        if(previous.hash!==hash)throw Error("A request ID cannot be reused with different content");
        return {...previous.receipt,replayed:true};
      }
      if(current.revision!==operation.expectedRevision)throw Error("Trial revision changed; inspect before retrying");
      const next=structuredClone(current);
      if(operation.kind==="publish"){
        const guide=operation.guide;
        if(current.guide)throw Error("Trial guide already exists; no blind overwrite");
        if(!guide||!safeId(guide.slug)||!Array.isArray(guide.sections)||["en","fr","it","uk"].some(locale=>typeof guide.title?.[locale]!=="string"||!guide.title[locale].trim()))throw Error("Trial guide requires four title translations and sections");
        if(!Array.isArray(operation.places)||operation.places.length>2000||operation.places.some(place=>!safeId(place.id)||typeof place.name!=="string"))throw Error("Invalid trial places");
        if(new Set(operation.places.map(place=>place.id)).size!==operation.places.length)throw Error("Duplicate trial place id");
        next.guide=structuredClone(guide);next.places=structuredClone(operation.places);
      }else{
        const place=next.places.find(place=>place.id===operation.placeId);
        if(!place)throw Error("Unknown trial place");
        if(place.image)throw Error("Existing trial illustration is not replaced");
        const media=operation.media;
        if(!media||!['png','jpg','webp'].includes(media.extension)||typeof media.base64!=="string")throw Error("Invalid trial media");
        const bytes=Buffer.from(media.base64,"base64");
        if(!bytes.length||bytes.toString("base64")!==media.base64||digest(bytes)!==media.sha256)throw Error("Trial media hash/encoding mismatch");
        const metadata=await require("sharp")(bytes,{limitInputPixels:8192*8192}).metadata();
        if(metadata.format!==({jpg:"jpeg",png:"png",webp:"webp"}[media.extension])||!metadata.width||!metadata.height||metadata.width>8192||metadata.height>8192)throw Error("Unsupported trial image signature/dimensions");
        const filename=`${media.sha256}.${media.extension}`;
        await fs.mkdir(path.join(directory,"media"),{recursive:true});
        const target=path.join(directory,"media",filename);
        try{await fs.writeFile(target,bytes,{flag:"wx"});}catch(error){if(error.code!=="EEXIST")throw error;if(digest(await fs.readFile(target))!==media.sha256)throw Error("Conflicting trial media");}
        place.image=`/media/${filename}`;
      }
      next.revision++;
      const receipt={status:"stored-local-only",revision:next.revision,requestId:operation.requestId,sourceHash:digest(JSON.stringify(next.guide)),production:"not-connected"};
      next.requests[operation.requestId]={hash,receipt};
      const temporary=stateFile+"."+randomUUID();
      try{await fs.writeFile(temporary,JSON.stringify({sha256:digest(JSON.stringify(next)),snapshot:next}),{flag:"wx"});await fs.rename(temporary,stateFile);}finally{await fs.rm(temporary,{force:true});}
      return receipt;
    }finally{await handle.close();await fs.rm(lock,{force:true});}
  }
  return {read,apply};
}
module.exports={createTrialStore};
