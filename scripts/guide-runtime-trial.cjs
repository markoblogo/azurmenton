#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require("node:fs/promises");
const path=require("node:path");
const os=require("node:os");
const http=require("node:http");
const assert=require("node:assert/strict");
const {randomBytes,timingSafeEqual}=require("node:crypto");
const {createTrialStore}=require("./lib/guide-runtime-trial.cjs");
const {digest,fileHash,saveJson}=require("./lib/guide-workflow.cjs");
const escape=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));

function createTrialServer(store,directory,token){
  const secret=Buffer.from(token);
  return http.createServer(async(req,res)=>{
    res.setHeader("Cache-Control","no-store");res.setHeader("X-Content-Type-Options","nosniff");
    try{
      const url=new URL(req.url,"http://127.0.0.1");
      if(req.method==="POST"&&url.pathname==="/manage"){
        const received=Buffer.from(req.headers.authorization??"");
        if(received.length!==secret.length||!timingSafeEqual(received,secret)){res.writeHead(401);res.end();return;}
        const chunks=[];let size=0;
        for await(const chunk of req){size+=chunk.length;if(size>4_000_000){res.writeHead(413);res.end();return;}chunks.push(chunk);}
        const result=await store.apply(JSON.parse(Buffer.concat(chunks).toString("utf8")));
        res.setHeader("Content-Type","application/json");res.end(JSON.stringify(result));return;
      }
      if(req.method!=="GET"){res.writeHead(405);res.end();return;}
      const state=await store.read();
      if(/^\/media\/[a-f0-9]{64}\.(?:png|jpg|webp)$/.test(url.pathname)&&state.places.some(place=>place.image===url.pathname)){
        const filename=path.basename(url.pathname);const bytes=await fs.readFile(path.join(directory,"media",filename));
        if(digest(bytes)!==filename.split(".")[0])throw Error("Stored media checksum mismatch");
        res.setHeader("Content-Type",filename.endsWith(".jpg")?"image/jpeg":filename.endsWith(".png")?"image/png":"image/webp");res.end(bytes);return;
      }
      const match=url.pathname.match(/^\/(en|fr|it|uk)\/guide\/([a-z0-9-]+)$/);
      if(match&&state.guide?.slug===match[2]){
        const locale=match[1],guide=state.guide;
        const sections=guide.sections.map(section=>`<section><h2>${escape(section.heading?.[locale])}</h2>${(section.body??[]).map(text=>`<p>${escape(typeof text==="string"?text:text[locale])}</p>`).join("")}</section>`).join("");
        const cards=state.places.map(place=>`<section><h2>${escape(place.name)}</h2>${place.image?`<img width="400" src="${escape(place.image)}" alt="${escape(place.name)}">`:'<p data-placeholder="true">Illustration pending</p>'}</section>`).join("");
        res.setHeader("Content-Type","text/html; charset=utf-8");res.end(`<!doctype html><html lang="${locale}"><head><meta name="robots" content="noindex,nofollow"><title>Local runtime acceptance only</title></head><body><main><h1>${escape(guide.title[locale])}</h1>${sections}${cards}</main></body></html>`);return;
      }
      res.writeHead(404);res.end();
    }catch(error){res.writeHead(/revision|request ID|already exists/.test(error.message)?409:400,{"Content-Type":"application/json"});res.end(JSON.stringify({error:error.message}));}
  });
}

async function main(){
  if(process.env.VERCEL)throw Error("This acceptance trial is local only");
  const args=process.argv.slice(2);
  if(args.length!==2||args[0]!=="--slug"||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(args[1]))throw Error("Usage: guide:runtime-trial -- --slug <existing-guide-slug>");
  const root=path.resolve(__dirname,"..");
  require("./lib/register-ts-content.cjs").registerTypescriptContent(root);
  const {guideArticles}=require("../src/content/guide.ts");const {places}=require("../src/content/places.ts");
  const guide=guideArticles.find(guide=>guide.slug===args[1]);if(!guide)throw Error("Unknown canonical guide");
  const ids=new Set(guide.sections.flatMap(section=>section.relatedPlaceIds??[]));
  const selected=places.find(place=>ids.has(place.id)&&place.image?.startsWith("/images/"));if(!selected)throw Error("Choose a guide with a rendered, already illustrated place for the isolated post-publish simulation");
  const originalImagePath=path.resolve(root,"public",selected.image.slice(1));
  const manifest=await jsonManifest(root);
  const derivative=manifest.find(item=>item.source===`public${selected.image}`)?.outputs?.find(file=>file.endsWith(".webp"));
  const imagePath=derivative?path.resolve(root,derivative):originalImagePath;
  if(!imagePath.startsWith(path.join(root,"public")+path.sep))throw Error("Unsafe canonical image path");
  const bytes=await fs.readFile(imagePath);const metadata=await require("sharp")(bytes).metadata();
  const extension=metadata.format==="jpeg"?"jpg":metadata.format;
  if(!["png","webp","jpg"].includes(extension))throw Error("Unsupported trial image format");
  const guarded=["src/content/guide.ts","src/content/places.ts","scripts/search-index.cjs"].map(file=>path.join(root,file));
  guarded.push(originalImagePath,imagePath);
  const buildFile=path.join(root,".next/BUILD_ID");try{await fs.access(buildFile);guarded.push(buildFile);}catch{}
  const before=await Promise.all(guarded.map(fileHash));
  const directory=await fs.mkdtemp(path.join(os.tmpdir(),"azur-guide-runtime-trial-"));
  const store=createTrialStore(directory);const token="Bearer "+randomBytes(32).toString("hex");
  const server=createTrialServer(store,directory,token);
  let browser;
  try{
    await new Promise((resolve,reject)=>{server.once("error",reject);server.listen(0,"127.0.0.1",resolve);});
    const origin=`http://127.0.0.1:${server.address().port}`;
    console.log("Local-only server started; checking publication and post-publication illustration.");
    const post=operation=>fetch(origin+"/manage",{method:"POST",headers:{authorization:token,"Content-Type":"application/json"},body:JSON.stringify(operation)});
    assert.equal((await fetch(origin+"/manage",{method:"POST",body:"{}"})).status,401);
    const operation={kind:"publish",requestId:"trial-publish",expectedRevision:0,guide:structuredClone(guide),places:[{id:selected.id,name:selected.name}]};
    const published=await post(operation);assert.equal(published.status,200);assert.equal((await published.json()).revision,1);
    assert.equal((await (await post(operation)).json()).replayed,true);
    const {chromium}=require("@playwright/test");browser=await chromium.launch({headless:true});const page=await browser.newPage();
    await page.goto(`${origin}/en/guide/${guide.slug}`);assert.equal(await page.locator("[data-placeholder]").count(),1);
    const imageOp={kind:"set-place-image",requestId:"trial-image",expectedRevision:1,placeId:selected.id,media:{base64:bytes.toString("base64"),sha256:digest(bytes),extension}};
    assert.equal((await post({...imageOp,requestId:"trial-stale-image",expectedRevision:0})).status,409);
    assert.equal((await (await post(imageOp)).json()).revision,2);
    const localeChecks=[];
    for(const locale of ["en","fr","it","uk"]){
      const response=await page.goto(`${origin}/${locale}/guide/${guide.slug}`);assert.equal(response.status(),200);
      assert.equal(await page.locator("h1").innerText(),guide.title[locale]);
      await page.locator("img").waitFor();await page.locator("img").evaluate(image=>image.decode());
      assert.equal(await page.locator("img").evaluate(image=>image.naturalWidth>0),true);
      assert.equal(await page.locator("[data-placeholder]").count(),0);localeChecks.push(locale);
    }
    const state=await createTrialStore(directory).read();assert.equal(state.revision,2);
    assert.equal(digest(JSON.stringify(state.guide)),digest(JSON.stringify(guide)));
    const served=await fetch(origin+state.places[0].image);assert.equal(digest(Buffer.from(await served.arrayBuffer())),digest(bytes));
    assert.deepEqual(await Promise.all(guarded.map(fileHash)),before);
    const report={version:1,checkedAt:new Date().toISOString(),status:"local-prototype-passed",guideSlug:guide.slug,placeId:selected.id,locales:localeChecks,
      publishedRevision:1,imageRevision:2,retryReplayed:true,staleWriteRejected:true,unauthenticatedWriteRejected:true,sourceAndBuildUnchanged:true,imageBytesUnchanged:true,
      productionConnected:false,paidStoreProvisioned:false,buildInvoked:false,usedExistingWebDerivative:Boolean(derivative),limitations:["Minimal local HTML acceptance harness, not the production Next.js guide renderer","Production migration, Pagefind, map, sitemap, related events and durable hosted storage are not integrated"]};
    await saveJson(path.join(root,"build/guide-runtime-trial",guide.slug+".json"),report);
    console.log(JSON.stringify(report,null,2));
  }finally{if(browser)await browser.close();await new Promise(resolve=>{server.close(resolve);server.closeAllConnections();});await fs.rm(directory,{recursive:true,force:true});}
}
module.exports={createTrialServer};
async function jsonManifest(root){return JSON.parse(await fs.readFile(path.join(root,"public/images/generated-manifest.json"),"utf8"));}
if(require.main===module){
  const deadline=setTimeout(()=>{console.error("Local trial timed out; no production action performed");process.exit(1);},120_000);
  main().catch(error=>{console.error(error.message);process.exitCode=1;}).finally(()=>clearTimeout(deadline));
}
