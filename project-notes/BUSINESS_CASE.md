# Business case

## Executive summary

TradeRef is a proposed trade-decision tool for managers in fantasy football redraft leagues. It brings player comparisons, roster needs, and clear explanations into one place, helping a manager decide whether to accept, reject, or counter an offer.

The website is a student prototype, not a live service. It contains 224 fictional players across 16 fictional football teams and a 12-team sample fantasy league. Its acceptance estimate and community values are illustrative; it has no real accounts, external data feeds, league integrations, or payments. The prototype demonstrates the proposed experience, not proven accuracy, demand, or revenue.

The business opportunity is plausible but unvalidated. A low-cost pilot should first test whether managers find the analysis useful and whether they would pay for individual or league-wide access. A real launch would depend on licensed, timely data, privacy safeguards, and evidence that the estimates help users make better-informed decisions.

## 1. The idea and customer value

The initial customer is an active manager in a 10–12 team redraft league who receives trade offers during the season. Managers may compare rankings, podcasts, and group-chat opinions, but those sources can differ and may not account for a manager’s roster needs. A player ranking alone does not explain whether a specific trade improves a particular lineup.

TradeRef’s proposed value is a quick, understandable comparison. The analyzer grades players using rest-of-season projections, current- and prior-season points, usage, injury status and expected time out, and teammate injuries. Kickers and defenses are graded on projected and recent points, with usage and teammate impact treated neutrally; their points do not change with the scoring toggle. It compares trade value above a replacement-level threshold, gives a win, fair, or loss verdict, and explains factors behind the result. It includes a “Make it fair” suggestion, position filters, and a scoring toggle for PPR, Half-PPR, and Standard.

The prototype also demonstrates 13-player fantasy rosters with one or two quarterbacks, three running backs, four wide receivers, two tight ends, one kicker, and one defense per team. Its team-needs card compares starter projections, and “Fit for your team” uses a lineup of one quarterback, two running backs, two wide receivers, one tight end, one flex (running back, wide receiver, or tight end), one kicker, and one defense. Other features include a heuristic “Chance they accept” estimate, saved trade history, sample trades, and community features. In a real product, team fit would need accurate league and lineup data. Acceptance estimates would need validation against a sufficiently large, representative set of real trade offers and outcomes; the current estimate is not a trained model.

The proposed pricing is an assumption to test, not an established offer:

| Proposed tier | Illustrative price | Intended value |
|---|---:|---|
| Free | Three analyses per week | Try player grades and trade verdicts |
| Pro | $4.99 per month or $24.99 per season | Unlimited analysis, league connection, team fit, acceptance estimates, and saved history |
| League Pass | $39.99 per season | Pro access and proposed league-wide features for a 12-manager league |

The Pricing page shows the Free, Pro, and League Pass plans, but the prototype takes no payment. These prices need customer interviews and willingness-to-pay tests before they can support a revenue forecast. TradeRef would avoid sportsbook advertising and betting-related partnerships.

## 2. Where information technology creates value

Porter’s value chain highlights operations and marketing and sales as the most relevant activities.

**Operations:** Software could combine licensed projections, statistics, usage, and injury information, apply consistent scoring rules, and show the result with its reasoning. Automating the comparison could reduce the effort of switching between sources. Its value would depend on data quality, timely updates, transparent scoring, and a useful mobile experience.

**Marketing and sales:** A free tier could let individual managers try the analyzer before deciding whether to pay. League Pass offers a group-based route to adoption: one purchase could introduce the product to an entire league, while invited managers could see shared features. This could lower acquisition effort per manager, but the effect is only a hypothesis; it depends on leagues valuing the shared features and inviting one another.

The current site is a single-page student prototype with fictional data. Its interface demonstrates the proposed workflow, including position-filtered player search and roster-aware lineup comparisons, but it does not yet deliver the operational benefits of real-time licensed data or platform integrations.

## 3. Network effects

TradeRef would be a one-sided network: the participating users are fantasy football managers. Advertisers would be a possible revenue source, not a second user group that improves the product. TradeRef does not plan to depend on ads.

The strongest potential network effect is a **data network effect**. If users knowingly and voluntarily report whether a trade was accepted and its outcome, a clean, representative dataset might help TradeRef test and improve acceptance estimates and community values. More records alone do not ensure better results: the data could be biased, manipulated, or too sparse. Any collection would require clear consent, safeguards, and quality checks. No real trade outcomes feed the prototype.

A second, local same-side effect could occur within a league. More participating members may make shared tools more useful. The prototype illustrates features that unlock at six and twelve league members; those unlocks are a concept, not evidence that managers will join or pay.

The basic player grade does not inherently improve as the user count grows. User growth could increase reach or revenue, but that is not itself a network effect. The cold-start approach is “come for the tool, stay for the network”: first offer a useful individual comparison based on reliable data, then invite users to connect their league and explore shared features.

## 4. Can it be copied? The moat question

The website, scoring interface, and basic grading rules are imitable. TradeRef’s potential advantage would come from trust, data quality, and league adoption rather than code alone. VRIN evaluates whether a resource is valuable, rare, difficult to imitate, and non-substitutable.

| Resource | VRIN assessment |
|---|---|
| Permission-based history of offers, decisions, and outcomes | Could become valuable and difficult to reproduce quickly if it is large, diverse, accurate, and responsibly collected. It is not automatically rare or defensible, and public rankings and other trade tools remain substitutes. |
| League integrations | Valuable for reducing manual setup, but not inherently rare or difficult to imitate. Platform policy changes could remove access; manual roster entry is a partial substitute. |
| Licensed projections and injury data | Necessary for timely grades, but other products may license similar feeds. Providers are substitutable, so this is an operating input rather than a durable moat. |
| Saved trade history and league setup | The prototype’s “My trade history” section in My League displays saved trades, which could create a modest switching cost. Overall, switching costs are low; users should be able to export or delete their information. |

Fantasy platforms already have league and trade information and could add similar analysis. A competitor could reproduce the interface quickly. A validated, responsibly collected outcome dataset and trusted league communities might take longer to build, but neither advantage exists yet. The current moat is weak; it could become moderate only if TradeRef earns user trust and proves that its data and community improve the service.

## 5. Cloud and operations

A real service could use:

- **SaaS:** identity and account management, payment processing, customer support, and licensed sports-data feeds.
- **PaaS:** application hosting, APIs, and a database for league settings, trade history, and consented outcomes.
- **IaaS:** rented computing capacity if custom prediction models later require it.

The prototype instead uses local browser storage for selected demo league and saved-trade information. It has no shared database, login, live data feed, platform API connection, or payment processing. The price tiers, free-analysis counter, acceptance estimate, and community activity do not represent a functioning subscription or real-world prediction service.

Major operating costs would include data licensing, hosting, payment fees, support, and the engineering and analysis needed to validate grades and predictions. Data licensing may be a significant recurring cost, so the business should confirm rights and costs before building around a provider. Platform integrations can change or become unavailable, making a manual roster-entry option important. The full list of proposed real-version requirements and rough costs is in the “What a real version would need” table in [PROJECT_LOG.md](./PROJECT_LOG.md).

## 6. Risks and ethics

- **Data accuracy:** Stale projections or injury information could mislead users. Show update timing, explain assumptions, and present grades as estimates rather than guarantees.
- **Privacy:** League imports can include information about people who have not signed up. Collect only what is needed, explain the import, limit visibility, secure stored data, and provide deletion and export controls.
- **Fairness and manipulation:** A manager could use the tool to pressure less-informed league-mates, while false trade reports could distort community values. Explain the analysis consistently, make league features available fairly, and moderate any future user-submitted data.
- **Minors and gambling adjacency:** Fantasy football audiences may include minors, and paid features could be mistaken for betting advice. Avoid sportsbook advertising and betting claims, use clear disclaimers, and set appropriate age and payment safeguards for any real paid service.
- **Platform and provider dependency:** Data vendors can change prices or terms, and fantasy platforms can change API access. Review contracts and retain manual entry as a fallback.
- **Service availability:** Traffic and interest may peak around deadlines. A real service would need monitoring, backups, support, and capacity planning; these are not part of the prototype.

TradeRef should not sell user or league data. Before launch, it should establish clear consent, retention, security, and deletion policies and review applicable privacy, consumer-protection, and age-related requirements.

## 7. Business-case test

The next step is validation, not a full-scale launch. Test the prototype with managers in the target league format and measure whether they understand the verdict, trust the explanations, return to analyze more trades, and value team-specific context. Test the proposed prices separately from the free experience.

Before a real pilot, confirm the cost and licensing terms for data, identify an integration path that respects platform rules, and define how analysis quality will be evaluated. Only proceed to paid plans or outcome-based predictions if the product demonstrates user value, the data can be used responsibly, and realistic recurring revenue can cover data, hosting, support, and payment costs.
I used GitHub Copilot and claude to help build the website. I used to claude to build me prompts based on how I wanted the website to look, and revise this business case from my direction and notes. I reviewed every section and can explain all of it.