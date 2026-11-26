# Agristack: orientation note

Document type: Paraphrased orientation note prepared for this project. NOT the official text.
Jurisdiction: India
Official source to verify: Ministry of Agriculture and Farmers Welfare, Agristack portal (agristack.gov.in) and the Digital Agriculture Mission documents.
Status: NEEDS-VALIDATION against the current official documents before any regulated or contractual use.

## What it is
Agristack is described as a digital public infrastructure initiative for the agriculture sector in India. It aims to give government and approved service providers a shared, consent-based way to reach farmer and farm data so that schemes, credit, insurance, advisory, and market services can be delivered with less paperwork.

## Core building blocks (as commonly described)
- Farmers Registry: a registry of farmers, linked to a unique farmer identifier often called a Farmer ID. Records typically relate a farmer to land parcels and to demographic details.
- Geo-referenced village maps: digital maps of village land parcels that let land and crop records be tied to a location.
- Crop Sown Registry: records of which crops are sown on which plots in a season, often captured through a digital crop survey carried out by field staff or farmers using a mobile app.
- Supporting layers: master data and standards, consent management, and APIs that let other systems request data from the registries.

## Design ideas that matter for software requirements
- Federated architecture: states hold and manage their own data, with common standards across states.
- Consent-based sharing: a farmer's data should be shared with a service provider only with the farmer's informed consent for a stated purpose.
- Interoperability: applications integrate through published APIs and common identifiers rather than copying whole databases.
- Seasonality: crop records are tied to seasons such as kharif and rabi, so data freshness and survey windows matter.

## Requirement prompts for an AgriTech product that integrates with it
- Which registry data is needed, for what purpose, and is consent captured and logged?
- How are Farmer ID and land parcel identifiers validated, and what happens when records are missing or disputed?
- How are tenant farmers and sharecroppers, who may not appear on land records, served?
- How are data corrections raised and reflected, and who approves them?
- What are the API availability, rate limit, and error handling expectations? NEEDS-VALIDATION against the official integration documents.
- What audit logs prove who accessed which farmer record and why?
