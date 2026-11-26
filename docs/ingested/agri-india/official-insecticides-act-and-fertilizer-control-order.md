# The Insecticides Act, 1968 & Fertiliser (Control) Order, 1985: Official Regulatory Mandates

**Document Title:** The Insecticides Act, 1968 (Act No. 46 of 1968) & The Fertiliser (Control) Order, 1985 (FCO)  
**Authority:** Department of Agriculture and Farmers Welfare (DA&FW), Ministry of Agriculture and Farmers Welfare, Government of India  
**Statutory Bodies:** Central Insecticides Board & Registration Committee (CIB&RC)  
**Jurisdiction:** Republic of India  
**Document Nature:** Official Statutory Legislation & Control Orders Governing Agricultural Inputs  

---

## 1. The Insecticides Act, 1968: Core Regulatory Mandates

The Insecticides Act, 1968 regulates the import, manufacture, sale, transport, distribution, and use of insecticides and pesticides to prevent risk to human beings or animals.

### A. Section 9: Registration of Insecticides by CIB&RC
* **Mandatory Registration:** No insecticide or chemical formulation may be manufactured, imported, distributed, sold, or commercially applied unless it is explicitly registered with the **Registration Committee** established under Section 5.
* **Label Claim Authorization:** The Registration Committee grants registration strictly tied to approved:
  1. Target crops (e.g., Paddy, Cotton, Wheat, Sugarcane);
  2. Target pests / diseases / weeds;
  3. Prescribed application dosage (grams or millilitres of active ingredient per hectare);
  4. Permissible application methods (knapsack sprayer, tractor-mounted boom sprayer, or aerial/drone spray).
* **Off-Label Application Prohibition:** Software platforms, AI advisory engines, or drone spraying platforms must **strictly adhere to CIB&RC label claims**. Recommending or applying chemicals for unapproved crops, unapproved pests, or in unapproved dosages is an offense under Sections 17 and 29 of the Act.

### B. Pre-Harvest Interval (PHI) & Maximum Residue Limits (MRL)
* **Pre-Harvest Interval (Waiting Period):** The statutory minimum number of days that must elapse between the last application of a chemical pesticide and the harvesting of the crop.
* **Food Safety and Export Compliance:** Adherence to PHI ensures that chemical residues on harvested agricultural produce do not breach statutory **Maximum Residue Limits (MRL)** set by the Food Safety and Standards Authority of India (FSSAI) or international Codex Alimentarius standards.
* **Software System Requirement:** AgriTech systems logging or scheduling pesticide spraying must compute and enforce the mandatory waiting period before issuing crop harvest advisories or generating mandi trading quality clearance.

### C. Safety and Protective Equipment (Rule 39–44, Insecticides Rules 1971)
* Mandatory provision of protective clothing, respirators, rubber gloves, and eye goggles to operators handling toxic formulations.
* Periodic medical examinations for operators engaged in commercial handling or spraying of dangerous chemicals.

---

## 2. The Fertiliser (Control) Order, 1985 (FCO): Statutory Standards

Issued under Section 3 of the Essential Commodities Act, 1955, the Fertiliser (Control) Order regulates the price, distribution, and quality of chemical, organic, and bio-fertilisers in India.

### A. Quality Specifications & Adulteration (Clause 19)
* No person or digital input marketplace shall sell or offer for sale any fertiliser which is not of prescribed standard, is misbranded, or does not conform to the specifications laid down in Schedule I, III, or IV of the Order.
* Every batch manufactured, imported, or sold must carry a statutory batch number, date of manufacture, guaranteed nutrient percentage (Total Nitrogen, Available Phosphate, Soluble Potash, Micronutrients), and maximum retail price (MRP).

### B. Mandatory Dealer Registration / Licensing (Clause 7 & 8)
* Any entity, physical retailer, or digital e-commerce platform distributing, selling, or facilitating the delivery of fertilisers to farmers must hold a valid **Certificate of Registration / Authorization** issued by the State Government Department of Agriculture.

### C. Soil Health Card (SHC) Scheme Alignment
* Official government advisory frameworks mandate that fertilizer and chemical recommendations provided to farmers must align with hyper-local **Soil Health Card (SHC)** data.
* Advisories must recommend balanced fertilization based on soil nutrient deficiencies (Nitrogen, Phosphorus, Potassium, Sulphur, Zinc, Boron, Iron, Organic Carbon, and Soil pH) rather than indiscriminate blanket nutrient application.

---

## 3. Engineering Requirements for AgriTech Platforms

1. **Chemical Catalog Integrity:** Maintain an authoritative, version-controlled database of CIB&RC approved chemicals with target crop mappings, approved dosages, waiting periods, and toxicity classifications (Blue, Green, Yellow, Red label).
2. **Advisory Safeguard / Human Review:** Automated advisory engines must never prescribe pesticide formulations without explicit expert validation by qualified agronomists.
3. **Traceability Logging:** Input purchase and application logs must capture chemical name, batch number, dealer license number, and application date to support organic certification, export compliance, and food safety audits.
