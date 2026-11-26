# PM-KISAN and direct benefit transfer: orientation note

Document type: Paraphrased orientation note prepared for this project. NOT the official scheme guidelines.
Jurisdiction: India
Official source to verify: PM-KISAN portal (pmkisan.gov.in) and the scheme operational guidelines.
Status: NEEDS-VALIDATION. Eligibility rules, amounts, and process steps change; confirm with the current guidelines.

## What it is
PM-KISAN is a central government income-support scheme for eligible farmer families. Support is described as being paid in instalments directly into bank accounts through direct benefit transfer (DBT). Land records, bank account details, and identity verification are central to how beneficiaries are registered and how payments are validated.

## Why software builders care
Many AgriTech products help farmers register for schemes, check status, or fix data errors. Typical failure points are:
- mismatch between names on land records, identity documents, and bank accounts;
- bank accounts not linked or not active for DBT;
- e-KYC steps that require OTP or biometric authentication and fail on poor networks;
- incomplete land records, especially for tenant farmers;
- status information that is hard to understand for a farmer in their own language.

## Requirement prompts
- What data fields does the product read or submit, and through which official channel? NEEDS-VALIDATION.
- How does the product avoid storing sensitive identity numbers it does not need?
- How are rejected or pending records explained to the farmer, with an action they can take?
- How does the product support assisted use at a common service centre or by an FPO agent, with consent and audit logs?
- How are fraud and impersonation risks handled for payments and status lookups?
- Never promise eligibility or payment dates in the product text unless sourced from the official system.
