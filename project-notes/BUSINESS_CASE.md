# Business case

## 1. The idea

- **Customer:** 
- **Problem:** A manager may have to compare one high-value player with several less valuable players, account for current production and injury risk, and decide quickly whether an offer helps their roster. Today, they may rely on a league chat, general player rankings, several separate websites, or their own judgment. Those sources can be hard to compare and may not explain a recommendation in one place.
- **Solution:** TradeRef lets a manager choose the players they would give and receive, then shows a grade for each player, totals both sides, and gives a winning, losing, or fair verdict. The grade considers rest-of-season projections, current and previous-season points, usage, injury status, and teammate injuries. For the trade totals, it uses **value above replacement**: each player's grade is reduced by 45, with a minimum trade value of zero. This means a bench-level player near waiver quality adds little or no value just because they are part of a multi-player offer. The analyzer then applies its consolidation bonus; totals within 5% are labeled fair. Sample buttons load and analyze example trades automatically.
- **Revenue:** The prototype has no revenue or payment feature. A possible model is **freemium**: keep basic trade comparisons free and charge a modest subscription for premium features such as saved rosters, customized league scoring, trade history, and more detailed analysis. Sponsorships could be considered later, but should not compromise trust in the recommendations.

The current site is a demonstration, not a live fantasy-football service: its players and statistics are fictional, and its scores are calculated from sample data rather than current player information.

## 2. Where IT creates value

TradeRef changes the **information and decision-making** part of the fantasy manager's value chain. Instead of manually comparing players across sources, a manager could enter an offer and receive a consistent side-by-side comparison. A clear explanation and verdict could reduce the time and effort needed to make a decision.

The website is a **digital distribution channel**: managers can access it in a browser without installing an app. Software and cloud services could support **scale**, serving more users without having to produce each comparison manually. The product's intended **differentiation** is the combination of quick comparison, injury and usage context, value-above-replacement totals that discount waiver-level players, and an understandable explanation—not simply displaying another list of rankings.

To deliver that value reliably, a real service would need accurate, timely player data and a transparent way of turning it into useful guidance. The prototype illustrates the interface and a sample grading approach, but does not yet provide those real-world capabilities.

## 3. Network effects

TradeRef would initially be a **one-sided product**: fantasy managers use it to assess their own trades. The prototype does not connect managers, leagues, or trading partners, so it does not currently have a strong direct network effect.

A possible **data network effect** could develop if many users voluntarily contribute privacy-safe, aggregated information about trade preferences or outcomes. More observations might help TradeRef improve its analysis, making the service more useful to future users. That benefit is only a possibility: it would require reliable data, user consent, careful privacy protections, and evidence that the information improves recommendations. More users alone would not guarantee better advice.

To address the **empty-network problem**, TradeRef should provide useful individual comparisons before any network exists. The prototype's fictional player list, player grades, and “Try a winning/fair/losing trade” examples demonstrate that starting point. A real launch could begin with a small supported set of leagues and a free basic comparison, then add community or aggregated-data features only if users want them.

## 4. Can it be copied? (the moat question)

The website and its basic comparison feature are **not a moat**. A competitor could reproduce the current prototype quickly. Under the **VRIN** framework:

- **Valuable:** Accurate, timely, and easy-to-understand advice could help managers make better decisions.
- **Rare:** The prototype has no rare asset yet. A future advantage might come from high-quality historical data connecting projections, injuries, league settings, and actual outcomes.
- **Hard to imitate:** The interface and scoring formula are easy to copy. A trustworthy history of data and demonstrated recommendation accuracy would take longer to build, but could still be matched by a well-funded competitor.
- **Organized to capture value:** A real company would need reliable data agreements, clear product ownership, privacy practices, and a way to maintain and improve its analysis. The prototype has none of these operational capabilities yet.

A basic competing website could be built in days or weeks. Building a dependable service with good data, integrations, and a track record could take months or longer. The strongest potential long-term advantage is not the code; it is a reputation for useful, transparent recommendations supported by high-quality data. Saved league settings and trade history might create **switching costs** later, but users must remain able to export or delete their data.

## 5. Cloud and operations

A real service would need to obtain and update player projections, statistics, injuries, and possibly league scoring settings. It would also need to operate the website, protect user accounts and data if accounts were added, monitor service quality, and correct data errors.

The business could buy **SaaS** services for support, analytics, and team collaboration; use a **PaaS** provider to host the website, APIs, and database; and rely on the provider's underlying **IaaS** infrastructure rather than managing physical servers. It would also need lawful, reliable sources for player data. Cloud services can make deployment and scaling easier, but introduce provider outages, recurring costs, vendor lock-in, and data-protection responsibilities. The current static prototype uses no backend, accounts, external APIs, or paid cloud services.

## 6. Risks and ethics

- **Bad or stale advice:** Inaccurate projections or injury information could lead a manager to make a poor trade. The fixed 45-point replacement baseline may also be a poor fit for some league sizes, roster rules, or scoring formats. Show when data was updated, explain the main factors and baseline, and make uncertainty clear; a real service could let managers adjust league settings.
- **Overconfidence:** A score is an estimate, not a guarantee of future performance. Avoid presenting a verdict as certainty and let users inspect the player-level reasoning.
- **Privacy:** A real product should collect as little data as possible, explain its use, secure it, and provide deletion and export options. Do not share identifiable league or roster data without permission.
- **Conflicts of interest:** Ads, sponsorships, or paid rankings could undermine trust. Clearly label paid placements and keep them separate from trade grades.
- **Access and inclusion:** Use clear language, accessible controls, and a usable mobile layout; do not make essential information available only to paying users.
- **Prototype limitations:** The current player data is fictional and the site is a student project, not real sports advice. A production service would need accurate data, testing, and clear disclosures before anyone relied on it.
