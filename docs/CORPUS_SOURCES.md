# Corpus sources

Everything under `docs/ingested/` is what the agents can search (BM25 keyword search). The agents cite these file paths in their output.

## Important: what these files are

The files under `agri-india/` and `security/` are **orientation notes written for this project in its own words**. They summarise well-known public frameworks so the agents have vocabulary and prompts to work with. They are **not** the official texts, may be out of date, and are **not** legal, agronomic, or financial advice.

Before relying on any statement, open the official source and check it. For serious use, replace or extend these notes with the real documents (see "Upgrading the corpus").

## Files and official sources to verify against

### Official Statutory Acts, Gazettes & Standard Operating Procedures (Primary Sources)

| File | Topic & Scope | Official Primary Source |
|---|---|---|
| `agri-india/official-dpdp-act-2023-statutory-extracts.md` | Data Fiduciary duties, Data Principal rights, notice in 22 languages, valid consent, breach reporting, child data | Gazette of India Extraordinary, Act No. 22 of 2023 (MeitY / Ministry of Law and Justice) |
| `agri-india/official-drone-rules-2021-and-spraying-sop.md` | UAS classifications, UIN, Remote Pilot Certificate, Airspace zoning, spray altitude, wind speed & 100m buffer rules | Ministry of Civil Aviation G.S.R. 589(E) & Ministry of Agriculture (DA&FW) Drone Spraying SOP |
| `agri-india/official-agristack-architecture-and-standards.md` | Federated architecture, Farmer ID, ULPIN/Bhu-Aadhaar, Digital Crop Survey, DEPA consent & REST APIs | Department of Agriculture and Farmers Welfare (DA&FW) Digital Agriculture Mission |
| `agri-india/official-pmfby-operational-guidelines.md` | Risk coverage (prevented sowing, standing crop, post-harvest, localized), NCIP, CCE-Agri app, YES-TECH & DBT | Revised Operational Guidelines for PMFBY, DA&FW, Ministry of Agriculture and Farmers Welfare |
| `agri-india/official-enam-mandi-operational-framework.md` | 6-stage trade flow, scientific assaying (AGMARK/BIS), e-bidding, e-payment, WDRA e-NWR warehouse integration | Small Farmers' Agribusiness Consortium (SFAC), Ministry of Agriculture and Farmers Welfare |
| `agri-india/official-insecticides-act-and-fertilizer-control-order.md` | CIB&RC label claim registration, Pre-Harvest Interval (PHI), MRL compliance, FCO dealer licensing & Soil Health | The Insecticides Act, 1968 & The Fertiliser (Control) Order, 1985 (Ministry of Agriculture) |
| `security/official-cert-in-cyber-security-directions-2022.md` | Mandatory 6-hr incident reporting, NTP synchronization with NIC/NPL, 180-day log retention in India | CERT-In Directions No. 20(3)/2022-CERT-In under Section 70B(6) of IT Act, 2000 |

### Orientation Notes & Framework Criteria (Supporting Summaries)

| File | Topic | Official source to check |
|---|---|---|
| `agri-india/agristack-overview.md` | Agristack registries, Farmer ID, consent-based sharing | Ministry of Agriculture and Farmers Welfare, agristack.gov.in |
| `agri-india/dpdp-act-notes-for-agritech.md` | Personal data protection duties and rights | MeitY, meity.gov.in, and the Gazette text of the DPDP Act, 2023 and its rules |
| `agri-india/pm-kisan-and-direct-benefit-transfer.md` | Income-support scheme and DBT | pmkisan.gov.in |
| `agri-india/crop-insurance-pmfby-notes.md` | Crop insurance process | pmfby.gov.in |
| `agri-india/enam-and-mandi-data.md` | e-NAM, mandis, price data, warehouse receipts | enam.gov.in, state APMC rules, WDRA |
| `agri-india/soil-health-and-advisory-notes.md` | Soil Health Card and advisory safety | Department of Agriculture and Farmers Welfare, ICAR, KVKs |
| `agri-india/drone-rules-and-agri-drones.md` | Drone rules and agricultural spraying | DGCA and the Digital Sky platform |
| `agri-india/input-regulation-pesticides-fertilisers-seeds.md` | Pesticide, fertiliser, seed regulation | Insecticides Act 1968, Fertiliser (Control) Order 1985, Seeds Act 1966, state notifications |
| `agri-india/agritech-glossary.md` | Terms | Project-authored |
| `agri-india/farmer-user-context.md` | User and field assumptions | Project-authored; confirm with user research |
| `security/security-guidance-for-agritech.md` | Security controls | CERT-In directions, NIST CSF and SSDF, OWASP |
| `security/ai-advisory-safety-notes.md` | AI advisory safety questions | Project-authored |
| `product/sdlc-selection-criteria.txt` | SDLC selection rules the SDLC agent reads | Project-authored |
| `product/agritech-sdlc-decision-guide.md` | Worked mappings of project type to SDLC | Project-authored |

## Upgrading the corpus (recommended)

1. Download the official PDFs or pages for the sources above.
2. Convert each to Markdown or plain text (`.md` or `.txt`), keeping the title, publisher, date, and URL at the top of the file.
3. Put them under `docs/ingested/agri-india/` (or a new subfolder) and restart the app.
4. Prefer short, well-titled files; the search works best when each file covers one topic.
5. Keep a line in this table for each file so reviewers know where it came from.

Only use documents you are allowed to copy and store. Do not add real farmer data.
