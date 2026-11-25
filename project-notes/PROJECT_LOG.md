# Project log

**Team name:** Patrick Villeneuve (individual project)
**Startup name:** TradeRef
**Live site link:** https://patrickvilleneuve.github.io/TradeRef/

## Work sessions

### Session 1 — Nov 24 — driver: Patrick
- **Goal for this session:** Turn on GitHub Pages, rebrand the template as TradeRef, add fake player data, and build the trade analyzer.
- **Key prompts we gave Copilot** (shortened):
  1. Create .github/copilot-instructions.md with the project rules.
  2. Rebrand as TradeRef, create a new home page and navigation, and add 60 fictional players in data.js.
  3. Build the trade analyzer with player scores, grades, a consolidation bonus, a verdict, reasons, and three example trades.
  4. Fix the losing example because it says "You're winning."
  5. Explain why Git would not let me commit my changes.
  6. Use value above replacement, with a player's trade value equal to the score minus 45, for bench players and make the examples run automatically.
  7. Update the business case.
- **What worked:** The home page, fictional player search, trade analyzer, player grades, and example trades work. The site went live through GitHub Pages.
- **What broke, and how we fixed it:** The losing example said winning, so we changed its players. Git could not commit because the codespace and GitHub had different histories; Copilot pulled the GitHub changes into the codespace first. A trade with two bench players looked like a win, so we changed trade totals to use value above replacement.
- **Committed?** Yes. Commits were "Update business case" (this included website code even though the message was wrong) and "Fixed trade totals to use value above replacement."

### Session 2 — Nov 25 — driver: Patrick
- **Goal for this session:** Build My League and the Community page, then rewrite the business case to match the rubric.
- **Key prompts we gave Copilot** (shortened):
  1. Build My League with demo league connection, team needs, fit for your team, and chance they accept.
  2. Fix the super-team roster with a snake draft, give the fantasy teams their own names, and hide example buttons while a league is loaded.
  3. Hide the Trading with box with no league loaded.
  4. Add a Community page with a managers slider, a league card that unlocks features, and a community trade values table.
  5. Make Community trade values uneven and mix the positions.
  6. Rewrite BUSINESS_CASE.md section by section to match the rubric.
  7. Rewrite this project log.
- **What worked:** Demo league connection, balanced team needs, fit for your team, chance they accept, the Community slider, league unlock card, and community trade values all work on the live site.
- **What broke, and how we fixed it:** See the "Things that broke" table below.
- **Committed?** Yes. Commits were "Updated business case and project log," "Added my league, team fit and chance they accept," "Balanced demo league rosters and renamed the teams," "Hid trading with box when no league is loaded," "Added community page showing the network effect," "Made community trade values look realistic," "Rewrote business case to match the rubric," and "Added AI use line to business case."

## Things that broke (running list)

| Date | What went wrong | What we tried | What finally fixed it |
|---|---|---|---|
| Nov 24 | Losing example said "You're winning." | Checked whether the verdict was backwards. | Changed the losing example's players. |
| Nov 24 | Git would not let me commit. | Asked Copilot why. | Copilot pulled the GitHub changes into the codespace first. |
| Nov 24 | A trade with two bench players said "You're winning." | Tested the trade by hand. | Used value above replacement, score minus 45. |
| Nov 25 | My team got every top player, so Team needs said Strong everywhere and Fit could never show a fix. | Checked the roster on the live site. | Used snake-draft rosters and made my team weak at RB. |
| Nov 25 | Fantasy team names were the same as football team names. | Noticed it on the roster page. | Gave the fantasy teams their own names. |
| Nov 25 | Example buttons used players who were not on either roster while a league was loaded. | Tested the analyzer with a league loaded. | Hid the example buttons while a league is loaded. |
| Nov 25 | An empty Trading with dropdown showed with no league loaded. | Checked the Analyze page after disconnecting. | Hid the box unless a league is loaded. |
| Nov 25 | Community trade values dropped in perfect steps and the top 4 were all QBs. | Looked at the table on the live site. | Used uneven values with mixed positions. |
| Nov 25 | The business case commit did not reach GitHub. | Checked GitHub and found the old version. | Clicked Sync Changes after committing. |

## What a real version would need

| Feature we faked or skipped | Real reason | Rough cost/difficulty |
|---|---|---|
| Real league import through fantasy platforms' APIs such as Sleeper's public API | It would save managers from entering rosters manually and keep teams, players and leagues in sync. | Medium cost and medium difficulty; public API limits or access changes could require support and a manual fallback. |
| A licensed sports data feed for injuries, analyst projections and usage | Timely, consistent, licensed data is needed for useful grades and to avoid relying on manually entered information. | Ongoing subscription cost and medium difficulty; expected to be one of the largest costs. |
| User accounts and logins | Accounts would identify users, protect saved settings and allow a league or subscription to follow a person across devices. | Low to medium cost and medium difficulty; needs login, password recovery, security and account deletion. |
| A shared database because trade history only saves in one browser now | Shared storage would keep saved leagues and trade outcomes available across devices and support community predictions. | Low to medium monthly cost and medium difficulty; needs schema design, privacy controls and backups. |
| Subscription payments | Payments would support free, Pro and League Pass plans and keep the product from relying on sportsbook ads. | Low monthly setup cost, plus a percentage of each payment, and medium difficulty for billing and refunds. |
| A real chance they accept model trained on real trades | The prototype estimate is made up; a real model needs manager responses and trade outcomes to become useful. | High difficulty and medium to high cost; a data scientist or skilled analyst would be needed to build and test it. |
| Protecting community values from people gaming them | Fake or repeated trade reports could push community values in the wrong direction and reduce trust. | Medium difficulty and ongoing cost; needs rate limits, anomaly checks, moderation and transparent rules. |
| Customer support during the season | Trade deadlines and Sunday injury changes create urgent questions, while data or import problems need quick help. | Low to medium ongoing cost; may need one part-time support person and written help articles at first. |

## Reflection (fill in at the end)

1. What surprised you most about building software with AI?
2. Which parts were easy, and which were hard? Why do you think that is?
3. If a competitor had the same AI tool, how long would it take them to copy your site?
