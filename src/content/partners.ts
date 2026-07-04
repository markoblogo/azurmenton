export type PartnerStatus = "prospect" | "sampling" | "guest_perk" | "sponsored" | "inactive";
export type PartnerPublicVisibility = "none" | "guest_only" | "public_editorial" | "sponsored";

export type LocalPartner = {
  id: string;
  name: string;
  category: string;
  city: string;
  website?: string;
  status: PartnerStatus;
  publicVisibility: PartnerPublicVisibility;
  internalNotes?: string;
};

export const localPartners: LocalPartner[] = [
  {
    id: "example-menton-producer",
    name: "Example Menton Producer",
    category: "local producer",
    city: "Menton",
    status: "prospect",
    publicVisibility: "none",
    internalNotes: "Draft placeholder only; not displayed publicly.",
  },
];

export function partnerLinkRel(partner: LocalPartner) {
  return partner.publicVisibility === "sponsored" ? "sponsored" : undefined;
}
