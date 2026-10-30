import { expect, test } from "@playwright/test";

test.setTimeout(180_000);
test.beforeEach(async ({ context }) => {
  await context.route("**/*", route => ["localhost", "127.0.0.1"].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
});

test("place and event links prefill the existing correction form without publishing", async ({ page }) => {
  await page.goto("/en/guide/jean-cocteau-menton-walking-route");
  const link=page.getByRole("link",{name:"Report a change",exact:true}).first();
  const target=new URL(await link.getAttribute("href") ?? "", "https://azurmenton.com");
  const expected=new URLSearchParams(target.hash.split("?")[1]);
  await link.click();
  const form=page.locator("#suggest-event form");
  await expect(form).toBeVisible();
  await expect(form.locator('[name="type"]')).toHaveValue("correction");
  await expect(form.locator('[name="page"]')).toHaveValue(expected.get("page")!);
  await expect(form.locator('[name="subject"]')).toHaveValue(expected.get("subject")!);
  let submitted: Record<string,string> | undefined;
  await page.route("**/api/editorial-submission",async route=>{submitted=route.request().postDataJSON(); await route.fulfill({json:{ok:true}});});
  await form.locator('[name="name"]').fill("Test editor");
  await form.locator('[name="email"]').fill("test@example.com");
  await form.locator('[name="reason"]').selectOption("hours");
  await form.locator('[name="message"]').fill("Opening hours need editorial review.");
  await form.locator('[name="privacy"]').check();
  await form.getByRole("button",{name:"Send for review",exact:true}).click();
  await expect(page.locator("#suggest-event [role=status]")).toContainText("manual review");
  expect(submitted).toMatchObject({type:"correction",page:expected.get("page"),subject:expected.get("subject"),reason:"hours"});
  await page.goto("/en/events/monaco-yacht-show-2027");
  await page.getByRole("link",{name:"Report a change",exact:true}).click();
  await expect(page.locator('#suggest-event [name="page"]')).toHaveValue("https://azurmenton.com/en/events/monaco-yacht-show-2027");
});

test("localizes contextual reasons and handles a second hash on the same events page", async ({page})=>{
  for(const locale of ["en","fr","it","uk"]){
    const fragment=new URLSearchParams({page:`https://azurmenton.com/${locale}/guide/menton-old-town#place-halles-du-marche`,subject:"Halles du Marché"});
    await page.setViewportSize({width:320,height:900});
    await page.goto(`/${locale}/events#suggest-event?${fragment}`);
    await expect(page.locator('#suggest-event [name="subject"]')).toHaveValue("Halles du Marché");
    await expect(page.locator('#suggest-event [name="reason"] option')).toHaveCount(6);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBe(0);
  }
  await page.screenshot({path:test.info().outputPath("correction-mobile.png")});
  await page.goto('/en/events#suggest-event?page=https%3A%2F%2Fevil.test&subject=Bad');
  await expect(page.locator('#suggest-event details')).not.toHaveAttribute("open","");
  for (const subject of ["First event", "Second event"]) {
    await page.goto(`/en/events#suggest-event?${new URLSearchParams({page:"https://azurmenton.com/en/events/monaco-yacht-show-2027",subject})}`);
    await expect(page.locator('#suggest-event [name="subject"]')).toHaveValue(subject);
  }
});

test("long native select labels cannot widen the mobile correction form", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  const fragment = new URLSearchParams({ page: "https://azurmenton.com/it/events/monaco-yacht-show-2027", subject: "Monaco Yacht Show" });
  await page.goto(`/it/events#suggest-event?${fragment}`);
  const type = page.locator('#suggest-event select[name="type"]');
  await expect(page.locator('#suggest-event [name="subject"]')).toHaveValue("Monaco Yacht Show");
  await type.evaluate((select: HTMLSelectElement) => {
    select.options[1].textContent = "Segnala una correzione alle informazioni ufficiali aggiornate per tutti i visitatori";
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  expect(await type.evaluate(element => element.getBoundingClientRect().right)).toBeLessThanOrEqual(300);
});

test("day plan exposes ordered external maps and explicit geography warnings",async ({page})=>{
  await page.goto('/en/my-trip');
  await page.evaluate(()=>localStorage.setItem('azurmenton.trip.v1',JSON.stringify({version:1,trip:{checkIn:"2027-02-15",checkOut:"2027-02-20",adults:2,children:0,car:false,interests:[],placeDays:[{date:"2027-02-17",placeIds:["halles-du-marche","oceanographic-museum-monaco","musee-jean-cocteau-bastion"]}]}})));
  await page.reload();
  const checks=page.locator('[data-day-plan-checks]');
  await expect(checks).toContainText("Stops in different cities");
  await expect(checks).toContainText("reviewed coordinates for every stop");
  await expect(checks.locator('a[href^="https://www.google.com/maps/dir/"]')).toHaveCount(0);
  await checks.getByText('Visitor information to check',{exact:true}).click();
  await expect(checks).toContainText('Bastion');
  await page.evaluate(()=>{
    const value=JSON.parse(localStorage.getItem('azurmenton.trip.v1')!);
    value.trip.placeDays[0].placeIds=["halles-du-marche","rue-saint-michel-menton","plage-sablettes"];
    localStorage.setItem('azurmenton.trip.v1',JSON.stringify(value));
  });
  await page.reload();
  await expect(checks.getByRole('link',{name:'Open in Google Maps',exact:true})).toHaveAttribute('href',/waypoints=/);
  await checks.getByLabel('Travel mode').selectOption('transit');
  await expect(checks.locator('a[href^="https://www.google.com/maps/dir/"]')).toHaveCount(2);
  for(const width of [320,390,1440]){
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBe(0);
  }
  await page.screenshot({path:test.info().outputPath('day-plan-navigation.png')});
});
