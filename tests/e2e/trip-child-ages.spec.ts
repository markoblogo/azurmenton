import { expect, test } from "@playwright/test";

test.setTimeout(180_000);
test.beforeEach(async({context})=>{
  await context.route("**/*",route=>["localhost","127.0.0.1"].includes(new URL(route.request().url()).hostname)?route.continue():route.abort());
});

test("optional child ages persist privately without replacing routes or stops",async({page})=>{
  await page.goto("/en/my-trip");
  await page.evaluate(()=>localStorage.setItem("azurmenton.trip.v1",JSON.stringify({version:1,trip:{checkIn:"2027-02-15",checkOut:"2027-02-20",adults:2,children:2,car:false,interests:[],dayRoutes:[{routeId:"cocteau-walking-day",date:"2027-02-17"}],placeDays:[{date:"2027-02-18",placeIds:["rampes-saint-michel","plage-sablettes"]}]}})));
  await page.reload();
  await page.getByLabel("Child 1",{exact:true}).fill("7");
  await page.getByRole("button",{name:"Save trip",exact:true}).click();
  await expect(page.getByRole("status")).toHaveText("Saved on this device");
  await page.reload();
  await expect(page.getByLabel("Child 1",{exact:true})).toHaveValue("7");
  await expect(page.getByLabel("Child 2",{exact:true})).toHaveValue("");
  await expect(page.locator("[data-child-age-checks]")).toContainText("Age rules are not verified");
  await page.getByText("Visitor information to check",{exact:true}).click();
  await expect(page.locator("[data-day-plan-checks]")).toContainText("Includes stairs");
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("azurmenton.trip.v1")!).trip);
  expect(saved.childAges).toEqual([7,null]);
  expect(saved.dayRoutes).toHaveLength(1);expect(saved.placeDays[0].placeIds).toHaveLength(2);
  await page.getByLabel("Children",{exact:true}).fill("1");
  await page.getByRole("button",{name:"Save trip",exact:true}).click();
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("azurmenton.trip.v1")!).trip.childAges)).toEqual([7]);
  const ageLabels={en:"Child 1",fr:"Enfant 1",it:"Bambino 1",uk:"Дитина 1"};
  for(const locale of ["en","fr","it","uk"] as const){
    await page.setViewportSize({width:320,height:900});
    await page.goto(`/${locale}/my-trip`);
    await expect(page.getByLabel(ageLabels[locale],{exact:true})).toHaveValue("7");
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBe(0);
  }
  await page.screenshot({path:test.info().outputPath("child-ages-mobile.png")});
});

test("public editorial content and canonical locale links work without JavaScript",async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  await context.route("**/*",route=>["localhost","127.0.0.1"].includes(new URL(route.request().url()).hostname)?route.continue():route.abort());
  const page=await context.newPage();
  try{
    for(const locale of ["en","fr","it","uk"]){
      for(const path of ["/guide/menton-old-town","/events","/stay"]){
        const response=await page.goto(`${baseURL}/${locale}${path}`);
        expect(response?.status()).toBe(200);
        await expect(page.locator("main h1")).toHaveCount(1);
        expect((await page.locator("main").innerText()).length).toBeGreaterThan(200);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://azurmenton.com/${locale}${path}`);
        for(const alternate of ["en","fr","it","uk"]) await expect(page.locator(`link[rel="alternate"][hreflang="${alternate}"]`)).toHaveCount(1);
        for(const script of await page.locator('script[type="application/ld+json"]').all()) {
          const raw=await script.textContent();
          expect(()=>JSON.parse(raw??"")).not.toThrow();
        }
      }
    }
    await page.goto(`${baseURL}/en/events?period=weekend&view=month`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href","https://azurmenton.com/en/events");
    await expect(page.locator('#suggest-event form')).toHaveAttribute("method","post");
    await page.goto(`${baseURL}/en/events/this-week`);
    await expect(page.locator('#newsletter-interest form')).toHaveAttribute("method","post");
    for(const path of ["my-trip","favourites"]){
      await page.goto(`${baseURL}/en/${path}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);
    }
  }finally{await context.close();}
});
