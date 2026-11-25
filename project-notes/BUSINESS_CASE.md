# Business case

## 1. The idea

TradeRef is for fantasy football managers in 10–12 team redraft leagues who receive several trade offers a season. They must decide whether to accept, reject, or counter, often without a clear answer.

Today, managers compare ranking sites, podcasts, and group chats. These sources can disagree, miss new injuries or injured teammates, and rarely account for the manager’s roster. A general ranking cannot show whether a trade improves a weak position, so managers are left guessing.

TradeRef gives each player a grade using rest-of-season projections, this and last season’s points, usage, injury status and expected weeks out, and teammate injuries. The analyzer shows value above replacement, a consolidation bonus for a one-for-many trade, a win, fair, or loss verdict, and reasons. Three examples demonstrate it. Connect the demo league to see a position-grouped roster and team needs in My League. In Analyze, “Fit for your team” compares starting points before and after, and “Chance they accept” estimates the other manager’s response. Community shows a managers slider, features unlocked as league members join, and community trade values.

The prototype has no payments. A possible freemium plan would offer three analyses a week for free; Pro would cost $4.99 per month or $24.99 per season for unlimited analyses, league connection, team fit, and acceptance estimates. League Pass would cost $39.99 per season for a whole 12-team league. TradeRef would not use sportsbook ads.

## 2. Where IT creates value

Porter’s value chain shows where software could add value. For TradeRef, the clearest activities are operations and marketing and sales. The current site is a student prototype with fictional data, but it demonstrates the real service’s proposed flow.

In operations, software could combine projections, season stats, usage, and injury information, then apply consistent grading rules in seconds. A manager doing this by hand might spend 20 minutes or more switching between sites, aligning scoring rules, and weighing an offer. Speed matters when offers have deadlines. Consistent comparisons and clear reasons also help managers understand a verdict instead of receiving only a yes or no.

In marketing and sales, League Pass gives one buyer a reason to invite the other 11 managers. One sale can reach a whole league instead of requiring 12 separate subscriptions or ads. The customer acquisition cost per manager can fall, and word of mouth can reach other leagues at low cost. The league card’s unlocking features give members a reason to invite league-mates. This matters because a small product cannot afford to reach everyone one at a time.

## 3. Network effects

TradeRef would be a one-sided network: fantasy football managers are the only participating group. There is no second group, such as advertisers, whose participation makes the product better. Ads could create revenue, but that is not a network effect. The potential benefit comes from manager activity and more members joining the same league.

The main possible effect is a data network effect. If users choose to log whether a trade was accepted or rejected and what happened afterward, TradeRef could compare its estimate with real outcomes. A large, varied, accurate sample could teach it which offers managers accept in different league situations. That could improve the “Chance they accept” prediction and community trade values for every manager, not only the person who logged a trade. More records do not automatically mean better predictions; results need checking for quality and bias. The prototype’s “Chance they accept” meter and Community trade values table show where this data could appear. Their values are fictional and are not trained on real outcomes.

There is also a local, same-side effect inside a league. Each additional member can make shared features more useful to the others. The Community league card illustrates the unlocks: at six members, users can see which managers want to trade; at twelve, the league-wide trade finder unlocks. This benefit comes from more of the same kind of user, not a second market side.

The basic player grade has no network effect; its scoring rules work the same for one user or one million users. More users could increase subscription revenue, but that is growth, not a network effect. TradeRef should not claim the grade improves just because its user count rises.

The cold-start problem is manageable because the analyzer can be useful on day one with analyst data. The idea is “come for the tool, stay for the network”: first offer a useful individual comparison, then invite a manager to bring in a league through League Pass. League participation and trade outcomes could add value later.

## 4. Can it be copied? (the moat question)

Anyone could rebuild the website in a weekend with Copilot. The pages, controls, bars, and scoring display are not the advantage. The possible advantage is a set of resources behind the interface. VRIN asks whether a resource is Valuable, Rare, hard to imitate, and Non-substitutable.

A dataset of accepted and rejected trades, plus later outcomes, is valuable because it can show what managers accept and what their choices reveal about trade value. It could be rare if TradeRef gathers a large, clean, permission-based history. It becomes hard to imitate quickly because a competitor cannot recreate a season of varied outcomes overnight. It is not fully non-substitutable: crowd-sourced value sites and public rankings are partial alternatives. So the dataset passes V, may pass R and I as it grows, and fails strict N. Useful, checked records could make it stronger each week.

League integrations through fantasy platforms’ public APIs, such as Sleeper’s, are valuable because they can import rosters and league details instead of asking users to enter them manually. They are not rare: any competitor can use a public API under its terms. They are not hard to imitate, and they are substitutable because another platform or manual roster entry can serve some of the same users. The platform could also change its rules or cut off access. This resource passes V, but fails R, I, and N.

Licensed injury and projection data is valuable because grades need timely information. It is not rare if other businesses can buy the same feed, and it is not hard to imitate when competitors can sign similar agreements. Other providers or public reporting are substitutes, so it fails R, I, and N. It is a necessary input, not a lasting moat.

Switching costs could come from a manager’s saved trade history and league setup. Those make it a little inconvenient to move, but the cost is small: users can recreate settings, and TradeRef should let them export or delete their records. These costs are not a strong reason to stay.

The biggest threat is the fantasy platforms themselves: they already hold trades in their apps and could add a trade grade. A funded rival could build a similar site in weeks, but would need a season or more of outcome data and league adoption to match prediction accuracy. The dataset and league networks can strengthen over time; integrations and data feeds can be copied or replaced. TradeRef’s moat is moderate at best, based on trust and useful data rather than clever code.

## 5. Cloud and operations

A real TradeRef service could use a login service as SaaS, so the team would not have to build account security from scratch. Payments could also run through a payment processor as SaaS. Injury and projection information would come from a sports data feed, also a SaaS or data API. The app and its database would run on a hosting platform as PaaS. If TradeRef trained its own prediction model, it could rent computing power as IaaS when needed. The current prototype has no real accounts, payments, external feeds, or model training.

Each service creates an operating risk. A data provider could raise prices, and data is likely to be the biggest cost; TradeRef should negotiate a season contract and keep a backup provider. A service outage on Sunday before kickoff could hit when traffic peaks; auto-scaling and a public status page would help manage capacity and communicate clearly. A fantasy platform could shut off its API and break league imports; manual roster entry should remain available as a fallback.

The full list of proposed real-version requirements is in the “What a real version would need” table in PROJECT_LOG.md. Keeping it there avoids repeating every staffing, security, and service requirement in this section.

## 6. Risks and ethics

Importing a league can pull information about managers who never signed up. TradeRef should explain the import, collect only what it needs, avoid showing other people’s names, and delete imported league data when someone disconnects.

A sharp manager could use the tool to fleece less-informed friends. League Pass gives everyone in the league access to the same analysis. TradeRef should show its grades and reasons openly, make clear they are estimates, and avoid presenting a verdict as a guarantee.

Fantasy football is close to gambling, and the audience can include minors. TradeRef should show no betting ads or sportsbook links, require users to be 18 or older for paid plans, and never sell user or league data to betting companies. Clear notices should say the tool is not betting advice. These limits protect trust and reduce the chance of encouraging risky behavior.
