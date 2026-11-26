# AgriTech SDLC decision guide (project notes)

Document type: Project-authored guidance for this tool. Not an external standard.

## Worked mappings from project type to a likely lifecycle

| Project type | Typical drivers | Likely fit |
|---|---|---|
| Farmer advisory chatbot or content app | Changing content, low harm if reviewed by experts, strong user feedback | Agile or Prototype with an expert-review gate |
| Mandi or produce marketplace | Payments, trust, fraud risk, seasonal peaks, changing market rules | Hybrid or DevSecOps |
| Crop insurance or claims platform | Government rules, audit, payments, flood-time peak load, officer workflows | Hybrid (V-Model gates plus iterative delivery) |
| IoT irrigation with remote valve control | Hardware dependence, safety of actuation, connectivity loss | V-Model or Spiral for the device layer, Agile for the app layer |
| Drone spraying or survey service | Aviation rules, operator certification, safety, spray records | V-Model |
| Soil testing and recommendation app | Lab integration, expert-validated recommendations | Hybrid with expert approval gates |
| Cold-chain and traceability | Sensors, batch records, audit, exporter or buyer requirements | Hybrid or V-Model |
| Government tender for a statewide portal | Fixed specification, formal acceptance | Waterfall |
| Early idea with unknown farmer needs | Discovery needed in the field | Prototype, then Agile |

## Questions that change the answer

1. Can a wrong output hurt a farmer's crop, health, or income? If yes, add expert approval gates and verification evidence.
2. Does the system act on the physical world (valves, pumps, drones, sprayers)? If yes, include V-Model style verification for that part.
3. Is there a fixed season deadline? If yes, plan releases and field pilots around the crop calendar.
4. Does it process personal data, land data, or payments? If yes, add privacy and security gates and DevSecOps controls.
5. Are the users unfamiliar with the product? If yes, use prototypes and field feedback before locking requirements.

## Offline-first note

If the brief expects use in low-connectivity villages, treat offline operation, data sync, and conflict resolution as design drivers early. They are expensive to add late, which argues against a purely feedback-driven lifecycle with no up-front architecture work.
