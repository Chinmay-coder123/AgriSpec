# AI-assisted farm advisory: safety notes

Document type: Project-authored guidance (not an external standard). Treat as questions to answer, not as authoritative rules.

## Why special care is needed
Farmers act on advice with real costs and irreversible effects during a season. Generic AI models can sound confident while being wrong about local crops, varieties, regulations, or weather.

## Controls to consider as requirements
- Source grounding: show where an answer comes from and the date it was approved.
- Scope limits: refuse or escalate topics such as pesticide selection and dose, veterinary treatment, loans, and insurance decisions unless an approved expert workflow exists.
- Expert review loop: qualified agronomists review new or changed advice, with versioning and rollback.
- Uncertainty handling: say when the system is unsure and give a way to reach a human, such as a helpline or an extension officer.
- Language quality: test translations and speech output with native speakers, including dialects, units, and local crop names.
- Feedback capture: let users flag wrong advice, and review flagged items quickly in season.
- Evaluation: keep a test set of real questions and expert answers, and re-run it before each release.
- Monitoring: track complaints, harmful outputs, and drift.
- Privacy: avoid sending personal data to external services without consent and a lawful basis. NEEDS-VALIDATION.

## Effect on lifecycle choice
Advice systems with weak review need a process that includes explicit expert approval gates and field validation, even if development is iterative.
