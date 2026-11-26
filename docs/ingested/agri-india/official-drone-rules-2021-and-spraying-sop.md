# The Drone Rules, 2021 and Agricultural Spraying SOP: Statutory & Technical Specifications

**Document Title:** The Drone Rules, 2021 (G.S.R. 589(E)) as amended by Drone (Amendment) Rules & SOP for Use of Drone Application with Pesticides for Crop Protection  
**Authority:** Ministry of Civil Aviation (DGCA) & Ministry of Agriculture and Farmers Welfare (DA&FW), Government of India  
**Official Digital Channel:** Digital Sky Platform (digitalsky.dgca.gov.in)  
**Jurisdiction:** Republic of India  
**Document Nature:** Official Statutory Rules & Standard Operating Procedures (SOP) for Agricultural Drone Services  

---

## 1. Classification of Unmanned Aircraft Systems (Drone Rules, Rule 5)

Drones are classified according to maximum all-up weight including payload:
1. **Nano drone:** Less than or equal to 250 grams.
2. **Micro drone:** Greater than 250 grams and less than or equal to 2 kilograms.
3. **Small drone:** Greater than 2 kilograms and less than or equal to 25 kilograms (Standard agricultural crop monitoring and light multispectral sensor drones).
4. **Medium drone:** Greater than 25 kilograms and less than or equal to 150 kilograms (Standard agricultural spraying drones equipped with liquid pesticide/fertilizer tanks).
5. **Large drone:** Greater than 150 kilograms.

---

## 2. Core Regulatory Mandates (Drone Rules, 2021)

* **Rule 14 & 15 (Unique Identification Number - UIN):**
  * Every unmanned aircraft operating in Indian airspace must possess a valid **Unique Identification Number (UIN)** generated on the Digital Sky platform.
  * No person shall operate an unmanned aircraft without a valid UIN, except for nano drones flying in uncontrolled airspace.
* **Rule 31 (Remote Pilot Certificate - RPC):**
  * No individual shall operate a drone (other than a nano drone or micro drone in non-commercial Green Zones) without holding a valid **Remote Pilot Certificate** issued by an authorised Remote Pilot Training Organisation (RPTO).
  * Digital platform integration: Platforms managing drone spraying services must verify RPC validity, pilot license number, and category rating (Small/Medium) prior to job dispatch.
* **Rule 22 (Airspace Zoning on Digital Sky):**
  * The Central Government publishes an interactive airspace map on the Digital Sky platform segregating Indian airspace into three distinct zones:
    1. **Green Zone:** Airspace up to a vertical distance of 400 feet (120 meters) above ground level (AGL) that has not been designated as a red zone or yellow zone. **No prior flight permission is required** for operating a drone in a green zone.
    2. **Yellow Zone:** Controlled airspace above 400 feet in green zones, or within designated distance buffers (5 km to 12 km) of operational airports. **Requires prior permission from the concerned Air Traffic Control (ATC) authority**.
    3. **Red Zone:** Prohibited airspace (near international borders, defense installations, vital economic assets, nuclear facilities). **No drone operations are permitted except under explicit Central Government authorization**.
* **Pre-Flight Notification (Rule 24):** Prior to operating in green zones, the remote pilot or platform must verify the airspace status on the Digital Sky map to ensure no temporary restricted airspace (TFR) has been notified.

---

## 3. Ministry of Agriculture SOP for Drone Spraying of Pesticides & Fertilizers

The Department of Agriculture and Farmers Welfare (DA&FW) issued the official Standard Operating Procedure (SOP) governing the application of pesticides and liquid nutrients using drones:

### A. Flight Operating Limits & Precision Parameters
* **Flight Altitude:** The spraying drone must maintain a strict operating height of **2 to 3 meters above the crop canopy**.
* **Operating Flight Speed:** Drone ground speed during spraying must be calibrated between **15 km/h to 25 km/h** to ensure uniform spray deposition and droplet penetration.
* **Wind Velocity Threshold:** Spraying operations **must be suspended if ambient wind speed exceeds 15 km/h (approx. 4.1 m/s)** to prevent drift into non-target fields, water channels, or residential dwellings.
* **Temperature Threshold:** Operations must not be conducted during peak heat hours (temperatures exceeding **35°C**) or intense thermal inversion conditions, which cause rapid droplet evaporation and off-target atmospheric drift.
* **Time of Application:** Optimal spraying hours are early morning (after dew dries) or late afternoon under calm wind conditions.

### B. Mandatory Buffer Zones & Environmental Safety
* **Water Bodies:** A mandatory safety buffer zone of **at least 100 meters** must be maintained from public water bodies (canals, rivers, lakes, village drinking wells, and farm ponds) to prevent aquatic toxicity.
* **Residential & Public Areas:** A minimum buffer of **100 meters** must be maintained from human settlements, village roads, schools, cattle sheds, and adjacent non-target crops.
* **Beekeeping / Pollinator Protection:** Operations must avoid blooming crops during peak bee-foraging hours; warnings must be issued to nearby apiary operators 24 hours prior to spraying.

### C. Chemical Registration and CIB&RC Approval
* Drones must **only spray pesticides and formulations officially approved and registered by the Central Insecticides Board & Registration Committee (CIB&RC)** for drone application.
* The platform must enforce verified label-claim dosages, target pest indications, and approved dilution ratios. The software must never calculate or recommend unauthorized tank mixes or off-label pesticide cocktails.

### D. Geo-Fencing, Return-to-Home (RTH), and Failsafes
* **Automated Geo-Fencing:** The flight planning software must enforce hard polygon geo-fences corresponding strictly to the contracted farmer's plot boundaries, with an automatic physical exclusion buffer near border edges.
* **Failsafe Mechanisms:** The drone must be equipped with automated:
  1. **Low-battery Return-to-Home (RTH)**;
  2. **Signal-loss / Command-and-Control Link Loss RTH**;
  3. **Obstacle-sensing and avoidance systems** (detecting electric poles, high-tension wires, trees, and field workers);
  4. **Spray tank depletion pause:** Auto-marking the exact GPS waypoint where chemical was exhausted, returning for refill, and resuming from that precise coordinate.

---

## 4. Operational Logging and Audit Trail Requirements

Digital platforms dispatching drone operators must capture, cryptographically hash, and store the following telemetry log records for a minimum statutory retention period:
1. **Pilot and Equipment Identifiers:** Remote Pilot Certificate number, UIN of the drone, model serial number, and battery cycle count.
2. **Pre-Flight Checks:** Calibration verification, nozzle flow rate check, wind speed and ambient temperature reading, Digital Sky zone verification.
3. **Flight Trajectory Data:** Continuous GPS coordinates (latitude, longitude, altitude AGL), flight speed, and real-time battery status.
4. **Spraying Metadata:** Total volume sprayed (litres/hectare), pesticide name, CIB&RC registration number, batch number, chemical concentration, start time, end time, and total effective treated area.
5. **Farmer Delivery Confirmation:** Digital service report delivered to the farmer (in English and local regional language) containing geo-tagged boundary map, treatment summary, and Pre-Harvest Interval (PHI) safety notice.
