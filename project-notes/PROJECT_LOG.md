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
- **Committed?** Yes. Commits were "Updated business case and project log," "Added my league, team fit and chance they accept," "Balanced demo league rosters and renamed the teams," "Hid trading with box when no league is loaded," "Added community page showing the network effect," "Made community trade values look realistic," and "Rewrote business case to match the rubric."

### Session 3 — Nov 26 — driver: Patrick
- Goal: build the Pricing page, saved trades with trade history, Make it fair, a PPR / Half-PPR / Standard scoring toggle and a free-plan counter; clean up the site; redesign it with a navy theme and a referee logo; update the business case.
- Key prompts (shortened): 1) add a Pricing section with Free, Pro and League Pass and a "no payment is taken" popup; 2) add Save trade and a My trade history card with Accepted, Rejected and Delete; 3) add Make it fair, the scoring toggle and the free plan counter; 4) cleanup: fix "100.0% against you", reword the first Why line, check every section on a phone, links, footer, console errors and outside links; 5) give the site a professional navy sports-analytics redesign with a referee logo, without changing how it works; 6) fix the logo being removed when the startup name is set, and make the home hero readable; 7) replace the referee logo and favicon with a cleaner striped-jersey SVG; 8) "Update the business case" (Copilot rewrote the whole file and changed the headings, so I discarded it); 9) update only sections 1 and 4 of the business case for the new features; 10) update this log.
- What worked: pricing popups, saving trades and marking them accepted or rejected, Make it fair, the scoring toggle, the free plan counter, the navy redesign and the new referee logo all work on the live site.
- What broke: see the table below.
- Commits: "Added pricing page", "Added save trade and trade history", "Added make it fair, scoring toggle and free plan counter", "Cleaned up the app making sure it all works well", "Redesigned site with referee logo and navy theme", "Updated business case and project log for Session 3".

### Session 4 — Nov 27 — driver: Patrick
- **Goal for this session:** Make the fictional fantasy rosters more realistic, support kickers and defenses throughout the analyzer and My League, refine player search, and update the business case and project log.
- **Key prompts we gave Copilot** (shortened):
  1. Add 16 fictional kickers, 16 team defenses and 12 backup quarterbacks.
  2. Rebuild the 12 fantasy rosters with a snake draft, realistic position counts, one kicker and one defense each, and a team that is Strong at QB and WR, OK at TE, and Weak at RB.
  3. Grade kickers and defenses using projected and recent points, with neutral usage and teammate impact, and no scoring-toggle adjustment.
  4. Group the My League roster by position, add kicker and defense needs, and include a flex in the starting-lineup fit.
  5. Add position filters and scrollable player search results, and explain kicker and defense grading in How it works.
  6. Update the home pitch and rename one duplicate player without changing that player's ID or stats.
  7. Update the business case and project log to reflect the prototype.
- **What worked:** All 12 fantasy teams have 13 unique players, including two QBs, three RBs, four WRs, two TEs, one K and one DEF. The requested strengths for the demo manager were verified; K/DEF grades stay finite and their points do not change with the scoring format. Community values and all three example trades still reference valid players.
- **What broke, and how we fixed it:** The first demo draft adjustments did not make the demo manager Strong at QB and WR and Weak at RB, so we retuned the draft swaps. Two players shared the name Flynn Oakley; renamed the backup QB Tobin Merritt while preserving his ID and stats. The home pitch in the page already matched the requested wording; updated `STARTUP.pitch` to match it.
- **Committed?** No commit was made during this session.

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
| Nov 26 | The referee logo disappeared after the site name loaded. | Checked how the header name was updated. | Moved `id="brand-name"` from the link to the text span, leaving the SVG intact. |
| Nov 26 | The home hero appeared light grey behind white text. | Checked the layered CSS background declaration. | Combined the yard-line overlays and navy gradient into one valid background declaration. |
| Nov 26 | The losing example said "100.0% against you" because the other side had 0 trade value. | Noticed it on the live site. | Showed the trade value points with "no starter-level value" instead of a percentage. |
| Nov 26 | The first Why line read "adds 85 trade value to the player you receive". | Read the results. | Reworded it to "The best player you get / give up is...". |
| Nov 26 | The first referee logo looked too simple and was hard to recognize at small size. | Compared it in the header. | Replaced it with a cleaner striped-jersey SVG. |
| Nov 26 | A short "Update the business case" prompt made Copilot rewrite the whole file, change the headings and add new sections. | Checked the file before committing. | Discarded the rewrite and used a prompt that only updated sections 1 and 4. |
| Nov 27 | The first roster draft did not meet the demo manager's requested position strengths. | Calculated starter-position ratings against the league average. | Adjusted draft swaps until QB and WR were Strong, RB Weak and TE OK. |
| Nov 27 | Two fictional players had the same name, Flynn Oakley. | Checked the player list for duplicate names. | Renamed the backup quarterback to Tobin Merritt without changing his ID or stats. |

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
