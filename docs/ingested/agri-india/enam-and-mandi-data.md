# e-NAM, mandis, and market price data: orientation note

Document type: Paraphrased orientation note prepared for this project. NOT official guidelines.
Jurisdiction: India
Official source to verify: e-NAM portal (enam.gov.in), Agmarknet price information, and state APMC rules.
Status: NEEDS-VALIDATION. Market rules are set by states and change.

## What it is
e-NAM is a national electronic trading platform that links regulated agricultural produce markets (mandis, under APMC regulation) so that produce can be traded with online bidding, with features such as quality assaying, e-payment, and price discovery. Agmarknet and related government portals publish market arrival and price information that many apps display.

## Ideas that shape software
- Regulated markets: trading in mandis follows state rules for licensing, fees, weighing, and payments. A marketplace product must not assume the same rules in every state.
- Grading and quality: quality parameters differ by commodity. Photo-based or sensor-based grading needs clear accuracy limits and a human dispute path.
- Price discovery: show the source and date of every price. Stale or wrongly attributed prices can mislead farmers.
- Payments: delays and disputes are common pain points; reconciliation and audit records matter.
- Logistics: weighing, packing, transport, and cold chain steps influence loss and price.
- Warehouse receipts: electronic negotiable warehouse receipts issued by registered warehouses can be used for pledge finance. NEEDS-VALIDATION with the regulator, the Warehousing Development and Regulatory Authority.

## Requirement prompts
- Which states and mandis are in scope, and which rules apply there? NEEDS-VALIDATION.
- Are prices shown with source, commodity variety, unit, and time, and what happens when data is missing?
- How are bids, rejections, quality disputes, and payment failures recorded and resolved?
- How are traders and buyers verified, and how is fraud prevented?
- What happens on peak arrival days or during price spikes (performance and availability)?
- How are farmers who use feature phones or shared devices served?
