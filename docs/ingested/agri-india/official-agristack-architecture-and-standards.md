# AgriStack Technical Architecture and Standards: Official Blueprint

**Document Title:** AgriStack Strategy & Architectural Blueprint (Digital Agriculture Mission)  
**Authority:** Department of Agriculture and Farmers Welfare (DA&FW), Ministry of Agriculture and Farmers Welfare, Government of India  
**Official Portal:** agristack.gov.in  
**Jurisdiction:** Republic of India  
**Document Nature:** Official Architectural Blueprint, Federated Standards, and Integration Protocols  

---

## 1. Architectural Vision and Core Objectives

AgriStack is designed as India's foundational **Digital Public Infrastructure (DPI)** for agriculture. It operates as an open, federated, and interoperable digital backbone that enables:
1. Seamless, paperless delivery of central and state government agricultural schemes (e.g., PM-KISAN, PMFBY, Soil Health Cards, Subsidies);
2. Access to institutional credit (Kisan Credit Card - KCC), insurance, and customized agro-advisory by public institutions and authorized private AgriTech service providers;
3. Consent-based data exchange governed by the principles of Data Empowerment and Protection Architecture (DEPA).

---

## 2. The Three Core Digital Registries

AgriStack is anchored on three authoritative digital registries established and maintained as single sources of truth:

### 1. Farmers Registry (Authoritative Farmer Identity)
* **Unique Farmer Identifier (Farmer ID):** A unique, persistent digital identifier assigned to every farmer across India.
* **Identity Verification:** Aadhaar-based e-KYC integration under statutory UIDAI regulations, utilizing cryptographic tokenization (Aadhaar Vault / Virtual ID) so that raw Aadhaar numbers are never stored in platform databases.
* **Demographic & Relationship Data:** Farmer name, gender, residential village, contact information, social category, and mapping to land parcels owned, co-owned, or cultivated.
* **Tenant & Sharecropper Representation:** Distinct provision for non-landholding cultivators, tenant farmers, and sharecroppers through verified village-level surveys or local self-government (Gram Panchayat) attestation.

### 2. Geo-Referenced Village Cadastral Maps & Land Parcel Registry
* **Spatial Cadastral Mapping:** Digital village maps with geo-referenced parcel boundaries created by state Survey, Settlement, and Land Records departments.
* **Unique Land Parcel Identification Number (ULPIN / Bhu-Aadhaar):** A unique 14-digit alphanumeric identification number assigned to every land parcel based on longitude and latitude coordinates of its vertices.
* **Federated Land Record Integration:** Real-time API integration with state land record systems (e.g., Bhoomi in Karnataka, Dharani in Telangana, Bhulekh in Uttar Pradesh/Maharashtra) to verify Record of Rights (RoR / Khasra / Khatauni) and dispute status.

### 3. Digital Crop Sown Registry (Seasonal Crop Survey)
* **Ground-Truthed Crop Data:** Authoritative seasonal records capturing which crops and crop varieties are cultivated on each specific land parcel (Khasra) during each agricultural season (Kharif, Rabi, and Zaid).
* **Digital Crop Survey (DCS):** Conducted through mobile applications by designated field surveyors (Krishi Sakhis, Village Revenue Officers) and farmer self-surveys.
* **Data Verification Standards:** Mandatory capture of:
  * High-accuracy GPS coordinates at the center and vertices of the plot;
  * Live, timestamped, geo-tagged crop photographs with orientation metadata;
  * Fallback mechanism for remote sensing and satellite-based crop verification (NDVI/SAR).

---

## 3. Data Governance and Consent Architecture (DEPA Alignment)

AgriStack strictly adheres to India's **Data Empowerment and Protection Architecture (DEPA)** and the **Digital Personal Data Protection Act, 2023**:
* **Federated Data Ownership:** Land records and farmer registries remain under the sovereign constitutional jurisdiction of individual State Governments. The Central AgriStack layer provides standard API gateways, schema definitions, and interoperability protocols.
* **Explicit, Purpose-Bound Consent:**
  * No private AgriTech entity, bank, insurer, or third party can query or retrieve farmer records without the farmer's express, electronic consent.
  * Consent artifacts are generated electronically according to a standardized JSON schema specifying:
    1. Consent ID and timestamp;
    2. Data consumer identity (e.g., AgriTech app, lending bank);
    3. Purpose code (e.g., "KCC_LOAN_APPLICATION", "PEST_ADVISORY", "DRONE_SPRAY_VERIFICATION");
    4. Exact data elements requested (e.g., "PLOT_BOUNDARY", "CROP_TYPE", "FARMER_NAME");
    5. Validity period and revocation endpoint.
* **Revocability:** Farmers can inspect active consent grants and revoke access through the Farmer Portal, mobile app, or designated assisted kiosks (Common Service Centers).

---

## 4. Open API Specifications and Integration Guidelines

AgriStack exposes standard RESTful APIs for registered ecosystem participants:
1. **Registry Verification API:** Validates Farmer ID and returns masked demographic confirmation and active land holdings.
2. **Land Parcel Query API:** Takes a ULPIN/Khasra number and returns geo-spatial polygon boundary coordinates in GeoJSON format.
3. **Crop Verification API:** Returns the certified sown crop, sowing date, and irrigation source for a specified parcel and season.
4. **Security & Transport Standards:**
  * All communications must use **TLS 1.3**;
  * Mutual authentication using **mTLS** for enterprise server-to-server endpoints;
  * API authentication via **OAuth 2.0 with signed JSON Web Tokens (JWT)**;
  * Strict rate limiting, anomaly detection, and tamper-evident cryptographic access audit logging.
