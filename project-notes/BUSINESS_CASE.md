# Business case

## 1. The idea

**Customer: Who exactly is it for?**

TradeRef is for fantasy football managers in 10 to 12 team redraft leagues who get several trade offers over a season. Most play on a phone app with friends or co-workers and have a day or two to answer an offer.

**Problem: What problem do they have today, and how do they solve it now?**

Right now a manager checks a ranking site, maybe a podcast, and then the group chat. Those sources often disagree. Rankings rarely account for a player who just got hurt or an injured teammate who opens up more touches, and none of them look at the manager's own roster. Most people end up going with their gut, and one bad trade can sink a season.

**Solution: What does your product do differently or better?**

TradeRef puts everything in one place. Each player gets a 0 to 100 grade built from rest-of-season projections, this season's and last season's points, usage, injury status with analysts' expected weeks out, and injuries to teammates. The totals use value above replacement, so two bench players can't add up to a star, and a consolidation bonus rewards the side getting the best player. The manager gets a verdict (winning, fair or losing) with the reasons behind it, a Make it fair suggestion when one side is ahead, and a PPR, Half-PPR or Standard toggle to match their league. It covers every roster spot, including kickers and defenses. After connecting a league, they also see whether the trade fixes a weak spot on their own team and how likely the other manager is to accept.

**Revenue: How does the company make money?**

TradeRef uses a freemium model. The Free plan gives three analyses a week. Pro costs \$4.99 a month or \$24.99 a season and unlocks unlimited analyses, league connection, fit for your team, chance they accept, saved trade history and Make it fair. League Pass costs \$39.99 a season and gives all 12 managers in a league Pro, plus a league-wide trade finder. The Pricing page on the site shows all three plans, though the prototype takes no payment. TradeRef would not run sportsbook ads, because betting money would hurt trust in the grades.

## 2. Where IT creates value

**Which parts of the value chain does your product change, and how? Which course concepts apply (e.g. scale, distribution channels, differentiation, data, switching costs)?**

Looking at Porter's value chain, TradeRef changes two activities the most.

**Operations.** For a person, judging a trade means opening several sites, lining up different scoring rules and weighing injuries in their head, which can take 20 minutes or more. TradeRef's software pulls projections, stats, usage and injury reports together and applies the same rules every time, so the answer comes back in seconds with the reasons shown. Each extra analysis costs almost nothing, which is the scale advantage of software. The grade also sets TradeRef apart from a plain ranking list, because it is about one specific trade and one specific roster.

**Marketing and sales.** League Pass turns one buyer into 12 users. Instead of paying to reach managers one at a time, TradeRef gets in front of a whole league through one person who already wants it, and the league features give that person a reason to invite everyone else. That lowers the customer acquisition cost per manager. Saved trade history also creates small switching costs.

## 3. Network effects

**Does your product get more valuable as more people use it?**

Only some parts of it. The basic grade has no network effect: it works the same for one user or one million, because it runs on analyst data. More users would bring more revenue, but that is growth, not a network effect.

**Is it a one-sided or two-sided market? Who are the sides?**

TradeRef is one-sided. The only group on the platform is fantasy managers. Advertisers could be a revenue source later, but they wouldn't make the product better for managers, so they aren't a second side.

**Where does the extra value come from as the network grows?**

Mostly from data. Every time a manager logs whether a trade was accepted or rejected, TradeRef learns more about what real managers value. With more trades logged, the Chance they accept prediction and the community trade values get more accurate for every user, not just the person who logged the trade. There is also a local, same-side effect inside each league: the more league-mates who use TradeRef, the more league features unlock, like seeing which managers want to trade.

**How would you solve the "empty network" problem at launch?**

The analyzer is useful on day one with no other users, because the grades come from analyst data. People come for the tool and stay for the network. From there, League Pass fills the network one league at a time, since a single buyer brings in up to 11 others.

**Point to the part of your prototype that shows this.**

The Community page. Its slider runs from 1,000 to 500,000 managers, and as it moves, trades logged per week climb from 240 to 120,000 while Chance they accept accuracy rises from about 55% to 84%. The Your league card shows features unlocking at 6 and 12 league members, and the Chance they accept meter in the analyzer is where that data would reach the user.

## 4. Can it be copied? (the moat question)

*Anyone in this class could rebuild your website in a weekend with the same AI tool. So the code is not your competitive advantage.*

**What about your business is valuable, rare, hard to imitate and well-organized (VRIN)?**

I built the site in four sessions with no coding background, so the advantage has to come from resources behind it. I tested three against VRIN (valuable, rare, inimitable, non-substitutable).

**Trade outcome data.** A record of real offers, whether they were accepted, and how the players did afterward is valuable because it powers Chance they accept and the community values. It becomes rare once TradeRef has collected a lot of it with users' permission, and hard to imitate because a competitor can't create a season of real outcomes overnight. Crowd-sourced trade value sites are a partial substitute, so it only partly passes N. It passes V, can pass R and I as it grows, and is the strongest resource TradeRef has.

**League integrations.** Connecting to platforms through their public APIs, like Sleeper's, saves managers from typing in rosters, so it is valuable. It is not rare or hard to imitate, because any competitor can use the same public API, and manual roster entry can substitute for it. The platform could also change its rules or cut off access. It passes V and fails R, I and N.

**Licensed injury and projection data.** The grades need timely data, so it is valuable, but any competitor can buy the same feed, and other providers are substitutes. It fails R, I and N. It is a cost of doing business, not a moat.

Saved trade history in My League and a connected league make it a little annoying to leave, but users could rebuild that somewhere else fairly quickly, so the switching cost is small.

**What would a competitor with a bigger budget need to copy you, and how long would it take?**

The biggest threat is the fantasy platforms themselves. They already hold every trade made in their apps and could add a trade grade as a feature. A funded startup could build a site like mine in a few weeks, but it would still need a season or more of real trade outcomes and leagues that already use it together. A big platform with its own trade data could do it much faster, which is why TradeRef's moat is moderate at best.

**Which of your advantages get stronger over time (data, network, brand, switching costs)?**

The trade outcome data and the league networks. Every week of the season adds more logged trades, which makes the predictions better and harder to match, and every league that joins through League Pass makes its managers more likely to stay.

## 5. Cloud and operations

**What would it take to run this for real? Which parts would you buy as cloud services (SaaS, PaaS, IaaS), and what are the risks of relying on them?**

Running TradeRef for real would mean buying most pieces as cloud services:

- Logins and accounts through a login service (SaaS).

- Payments through a payment processor (SaaS).

- Injury, projection and usage data from a sports data provider (SaaS, delivered through an API).

- The app and its database on a hosting platform (PaaS).

- Rented computing power to train the Chance they accept model (IaaS), only when it's needed.

Each one adds a risk. The data feed would likely be the biggest cost, and the provider could raise prices, so I'd sign a season-long contract and keep a backup provider. Traffic peaks on Sunday just before kickoff, and an outage then would hurt the most, so the hosting needs auto-scaling and a public status page. If a fantasy platform shuts off its API, league import breaks, so manual roster entry should always stay available. The full list is in the "What a real version would need" table in the project log.

## 6. Risks and ethics

**What could go wrong for your customers, their data, or society? What would you do about it?**

**League-mates' data.** Importing a league pulls in the names and rosters of managers who never signed up. I'd only import what the features need, never show those details outside their own league, and delete the imported data as soon as someone disconnects.

**Fleecing friends.** A sharp manager could use TradeRef to take advantage of league-mates who know less. League Pass gives everyone in the league the same tool, and every grade shows its reasons.

**Gambling and minors.** Fantasy football sits close to sports betting, and some players are teenagers. TradeRef would show no betting ads, require users to be 18 or older for paid plans, and never sell data to betting companies.

**AI use:** With my instructor's permission, I used GitHub Copilot (agent mode) and Claude to draft and revise this business case from my direction and notes. I reviewed every section and can explain all of it.
