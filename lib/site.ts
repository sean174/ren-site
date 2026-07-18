// Single source of truth for company identity, contact info, and legal dates.
// Every page/component imports from here so the business name, address, phone,
// and email are byte-for-byte identical across the whole site. This consistency
// is a primary trust signal for both human and carrier (A2P) reviewers, and it
// must match the Twilio brand and business profile exactly.

export const COMPANY = {
  legalEntity: "Walker Thomas LLC",
  educationBrand: "Retirement Education Network",
  educationBrandShort: "REN",
  advisoryService: "Elevated Advisor",
  address: {
    street: "700 Raleigh Ave",
    city: "Norfolk",
    state: "VA",
    zip: "23507",
  },
  addressOneLine: "700 Raleigh Ave, Norfolk, VA 23507",
  email: "support@elevatedadvisor.com",
  phone: "(720) 674-8921",
  phoneHref: "tel:+17206748921",
  domain: "retirementeducationnetwork.com",
  // Original public launch date of the site. Legal effective dates and the
  // copyright year derive from this, not from "today".
  launchDate: "May 9, 2026",
  copyrightYear: 2026,
} as const;

// Standard disclosure line making the one-company relationship transparent.
export const OWNERSHIP_DISCLOSURE =
  "Retirement Education Network and Elevated Advisor are services of Walker Thomas LLC.";
