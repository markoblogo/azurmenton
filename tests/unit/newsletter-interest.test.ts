import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { newsletterConsentVersion, validateNewsletterInterest } from "@/lib/newsletter-interest";
import { POST } from "@/app/api/editorial-submission/route";
vi.mock("@/lib/turnstile",()=>({verifyTurnstileToken:vi.fn(async()=>({ok:true}))}));
vi.mock("@/lib/rate-limit",()=>({checkBookingRequestRateLimit:vi.fn(()=>({ok:true})),getClientIdentifierFromHeaders:()=>"test"}));
const valid={type:"newsletter",email:"test@example.com",locale:"uk",action:"subscribe",privacy:"accepted",consent:"accepted",consentVersion:newsletterConsentVersion};
beforeEach(()=>{vi.stubEnv("RESEND_API_KEY","test");vi.stubEnv("EDITORIAL_TO_EMAIL","editor@example.com");});
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();vi.clearAllMocks();});
describe("interest collection without a mailing list",()=>{
  it("requires purpose-specific consent and a known locale/version",()=>{
    expect(validateNewsletterInterest(valid)).toMatchObject({email:valid.email,locale:"uk"});
    for(const change of [{consent:""},{privacy:""},{locale:"bad"},{consentVersion:"old"},{action:"broadcast"},{email:"bad"}])expect(validateNewsletterInterest({...valid,...change})).toBeNull();
    expect(validateNewsletterInterest({...valid,action:"withdraw",consent:""})).not.toBeNull();
    expect(validateNewsletterInterest({...valid,childAges:[7],checkIn:"2027-02-15"})).not.toHaveProperty("childAges");
  });
  it("only sends a moderation receipt to the team, never to the subscriber or contacts API",async()=>{
    const fetch=vi.fn<typeof globalThis.fetch>(async()=>Response.json({id:"receipt"}));vi.stubGlobal("fetch",fetch);
    const request=new Request("https://azurmenton.com/api/editorial-submission",{method:"POST",headers:{Origin:"https://azurmenton.com"},body:JSON.stringify(valid)});
    expect((await POST(request)).status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe("https://api.resend.com/emails");
    const body=JSON.parse(fetch.mock.calls[0][1]!.body as string);
    expect(body.to).toBe("editor@example.com");expect(body.to).not.toBe(valid.email);
    expect(body.text).toContain("WAITLIST REQUEST ONLY");expect(body.text).toContain("No email ownership verification");expect(body.text).toContain(newsletterConsentVersion);
    expect(body.subject).toContain("Newsletter interest");
  });
});
