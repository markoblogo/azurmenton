import { expect, test } from "@playwright/test";
test.setTimeout(180_000);
test.beforeEach(async({context})=>{
  await context.route("**/*",route=>["localhost","127.0.0.1"].includes(new URL(route.request().url()).hostname)?route.continue():route.abort());
});

test("details and editorial links are localized without replacing the newest-guide slot",async({page})=>{
  const headings={en:"Menton in detail",fr:"Menton en détail",it:"Mentone nei dettagli",uk:"Ментон у деталях"};
  for(const locale of ["en","fr","it","uk"] as const){
    await page.setViewportSize({width:320,height:900});
    await page.goto(`/${locale}/guide#menton-in-detail`);
    const section=page.locator("#menton-in-detail");
    await expect(section.getByRole("heading",{name:headings[locale],exact:true})).toBeVisible();
    await expect(section.locator('a[href$="/guide/jean-cocteau-menton-walking-route"]')).toHaveCount(1);
    await expect(section.locator('a[href*="#place-"]')).toHaveCount(1);
    await expect(section.locator("img")).toBeVisible();
    await expect.poll(()=>section.locator("img").evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBe(0);
  }
  await page.screenshot({path:test.info().outputPath("menton-details-mobile.png")});
});

test("newsletter interest goes to manual intake only and supports withdrawal",async({page})=>{
  await page.goto("/en/events/this-week#newsletter-interest");
  const section=page.locator("#newsletter-interest");
  await expect(page.locator("[data-booking-cta]")).toHaveCSS("background-color","rgb(23, 49, 58)");
  await expect(page.locator('[data-booking-cta] a[href="/en/apartments"]')).toHaveCSS("color","rgb(255, 255, 255)");
  await expect(section).toContainText("no newsletter is being sent yet");
  let payload:Record<string,string>|undefined;
  await page.route("**/api/editorial-submission",async route=>{payload=route.request().postDataJSON();await route.fulfill({json:{ok:true}});});
  await section.getByLabel("Email",{exact:true}).fill("test@example.com");
  await expect(section.locator('[name="consent"]')).not.toBeChecked();
  await section.locator('[name="consent"]').check();await section.locator('[name="privacy"]').check();
  await section.getByRole("button",{name:"Send request",exact:true}).click();
  await expect(section.getByRole("status")).toContainText("manual handling");
  expect(payload).toMatchObject({type:"newsletter",action:"subscribe",email:"test@example.com",locale:"en",consent:"accepted"});
  expect(payload).not.toHaveProperty("childAges");
  await page.reload();
  await section.locator('[name="action"]').selectOption("withdraw");
  await expect(section.locator('[name="consent"]')).toHaveCount(0);
  await section.getByLabel("Email",{exact:true}).fill("test@example.com");
  await section.locator('[name="privacy"]').check();await section.getByRole("button",{name:"Send request",exact:true}).click();
  expect(payload).toMatchObject({type:"newsletter",action:"withdraw"});
});

test("nearby-order preview needs explicit apply and can undo without changing favourites",async({page})=>{
  await page.goto("/en/my-trip");
  const original=["halles-du-marche","plage-sablettes","rue-saint-michel-menton"];
  await page.evaluate(ids=>localStorage.setItem("azurmenton.trip.v1",JSON.stringify({version:1,trip:{checkIn:"2027-02-15",checkOut:"2027-02-20",adults:2,children:0,car:false,interests:[],placeDays:[{date:"2027-02-18",placeIds:ids}]}})),original);
  await page.reload();
  const suggestion=page.locator("[data-place-order-suggestion]");
  await suggestion.getByRole("button",{name:"Suggest nearby order",exact:true}).click();
  await expect(suggestion).toContainText("not saved yet");
  const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem("azurmenton.trip.v1")!).trip.placeDays[0].placeIds);
  expect(await saved()).toEqual(original);
  await suggestion.getByRole("button",{name:"Apply this order",exact:true}).click();
  await expect.poll(saved).toEqual([original[0],original[2],original[1]]);
  await suggestion.getByRole("button",{name:"Undo suggested order",exact:true}).click();
  await expect.poll(saved).toEqual(original);
  await page.setViewportSize({width:320,height:900});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBe(0);
});

test("site search returns local-language guides and real place anchors",async({page})=>{
  for(const [locale,query] of [["en","pharmacy"],["fr","pharmacie"],["it","farmacia"],["uk","аптеки"]]){
    await page.goto(`/${locale}/search`);
    await page.locator("#site-search").fill(query);
    await expect(page.locator(`main a[href^="/${locale}/guide/"]`).first()).toBeVisible();
    await expect(page.locator(`main a[href*="#place-"]`).first()).toBeVisible();
  }
});
