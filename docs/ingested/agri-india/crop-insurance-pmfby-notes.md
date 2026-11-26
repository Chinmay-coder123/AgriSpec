# Crop insurance (PMFBY): orientation note

Document type: Paraphrased orientation note prepared for this project. NOT the official scheme text.
Jurisdiction: India
Official source to verify: Pradhan Mantri Fasal Bima Yojana portal (pmfby.gov.in) and the current operational guidelines.
Status: NEEDS-VALIDATION. Premium rates, cut-off dates, and rules differ by state and season.

## What it is
Pradhan Mantri Fasal Bima Yojana (PMFBY) is a government-supported crop insurance scheme. Farmers insure notified crops in notified areas for a season, paying a subsidised premium, and receive compensation when covered losses occur.

## Process ideas that shape software
- Enrolment: farmers enrol before season-specific cut-off dates, often through banks, common service centres, agents, or the national portal. Loanee and non-loanee farmers may follow different routes.
- Area-based assessment: for many losses the assessment uses yield estimates for a notified area, commonly based on crop cutting experiments, with remote sensing and other technologies increasingly used to support them.
- Localised calamities: some events such as hailstorm, landslide, inundation, or cloud burst may be assessed at the individual farm level, and farmers are expected to report losses within a short window. NEEDS-VALIDATION for the exact reporting window.
- Claims: approved claims are paid through direct transfer to bank accounts.
- Multiple parties: farmers, banks, insurers, state agriculture departments, field staff, and grievance officers all take part.

## Requirement prompts
- How does a farmer report loss, with geo-tagged photos, in poor connectivity, and receive a reference number?
- How do field officers verify and record findings offline and sync later?
- How are surges after floods, drought, or hailstorms handled (peak load, queues, support)?
- How are satellite, weather, and sensor inputs validated, and who reviews disputed assessments?
- What audit trail shows how each claim decision was made, and who approved it?
- How are grievances recorded and tracked to closure?
- Which deadlines are fixed by season, and how do release plans respect them?
