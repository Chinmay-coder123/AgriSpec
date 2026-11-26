# Security guidance for AgriTech systems: orientation note

Document type: Paraphrased orientation note prepared for this project. NOT an official standard text.
Jurisdiction: India, with international references
Official sources to verify: CERT-In (cert-in.org.in) directions and advisories under the Information Technology Act, 2000; NIST Cybersecurity Framework; NIST Secure Software Development Framework; OWASP guidance (Top 10, IoT, API, and LLM application risks).
Status: NEEDS-VALIDATION. Reporting timelines and retention periods must be confirmed against current CERT-In directions.

## Ideas worth turning into requirements
- Identity and access: strong authentication where money or personal data is involved, role-based access, least privilege, and clear handling of assisted use and shared devices.
- Data protection: encryption in transit and at rest, minimal retention, masking of identifiers in logs, and secure key management.
- API security: authentication and rate limiting on integrations with government and partner APIs; validation of all inputs; protection against broken access control.
- IoT security: unique device identities, secure boot where possible, signed firmware updates, no default passwords, secure onboarding, and the ability to revoke a lost or stolen device.
- Remote actuation: valves, pumps, and drones should require authenticated, authorised, logged commands with safe defaults on loss of connection.
- Data integrity: sensor and image data used for payments or claims should be tamper-evident, with time and location metadata and checks for spoofing.
- Logging and monitoring: security events logged with time synchronisation and retained as required; alerting for anomalies.
- Incident response: documented roles and steps, and the ability to report incidents to authorities within the timelines that apply. NEEDS-VALIDATION.
- Supply chain: track third-party libraries, models, and devices; keep a software bill of materials; apply updates.
- Backup and recovery: tested restore, with higher availability planning for critical seasons.
- Secure development: threat modelling, code review, dependency scanning, and security testing before release.

## AI-specific cautions
If the product uses a language model or other AI for advice or chat: ground answers in approved content, filter unsafe categories, keep prompts and outputs under privacy controls, guard against prompt injection from uploaded documents and web content, and log model and content versions for audit. A human must review high-stakes outputs.
