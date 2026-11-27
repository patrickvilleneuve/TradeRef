# Project log

**Team name:** Patrick Villeneuve (individual project)

**Startup name:** TradeRef

**Live site link:** https://patrickvilleneuve.github.io/TradeRef/

**Repository:** https://github.com/patrickvilleneuve/TradeRef

## Work sessions

### Session 1 - Nov 24 - driver: Patrick

**Goal for this session:**

Turn on GitHub Pages, rebrand the template as TradeRef, add fake player data, and build the trade analyzer.

**Key prompts we gave Copilot (shortened):**

1.  Create .github/copilot-instructions.md with the project rules (plain HTML, CSS and JavaScript, fake data only, no real NFL or company names, no login or payment forms, keep the footer).

2.  Rebrand the site as TradeRef with a new home page and nav, and add 60 fictional players to data.js.

3.  Build the trade analyzer with player scores, grades, a consolidation bonus, a verdict, reasons and three example trades.

4.  "When I click the example button for the losing trade, the verdict says 'You're winning this trade'." Fix it.

5.  "Explain why it is not letting me commit my changes."

6.  Bench players are overvalued: use value above replacement (score minus 45) and make the examples run automatically.

7.  "Update the business case."

**What worked:**

The home page, player search, analyzer, grades and example trades all worked, and the site went live on GitHub Pages.

**What broke, and how we fixed it:**

The losing example said I was winning, so Copilot changed that example's players. Git wouldn't let me commit because my codespace and GitHub were out of sync, so Copilot pulled the GitHub changes in first. Giving away a star for two bench players said I was winning, so I switched the totals to value above replacement.

**Committed?**

Yes. Commit messages:

- Update business case (this was actually the website code; I typed the wrong message)

- Fixed trade totals to use value above replacement

### Session 2 - Nov 25 - driver: Patrick

**Goal for this session:**

Build My League and the Community page, then rewrite the business case to match the rubric.

**Key prompts we gave Copilot (shortened):**

1.  Build My League with a demo league connection, team needs, fit for your team and chance they accept.

2.  My team is a super team: hand out players like a snake draft, give the fantasy teams their own names, and hide the example buttons while a league is loaded.

3.  Hide the Trading with box when no league is loaded.

4.  Add a Community page with a managers slider, a league card that unlocks features, and a community trade values table.

5.  Make the community trade values uneven and mix the positions.

6.  Rewrite BUSINESS_CASE.md section by section to match the rubric.

7.  Rewrite the project log.

**What worked:**

The demo league, balanced team needs, fit for your team, chance they accept, the Community slider, the league unlock card and the community trade values all worked on the live site.

**What broke, and how we fixed it:**

See the Things that broke table below.

**Committed?**

Yes. Commit messages:

- Updated business case and project log

- Added my league, team fit and chance they accept

- Balanced demo league rosters and renamed the teams

- Hid trading with box when no league is loaded

- Added community page showing the network effect

- Made community trade values look realistic

- Rewrote business case to match the rubric

- Rewrote project log for session 1 and 2

### Session 3 - Nov 26 - driver: Patrick

**Goal for this session:**

Build the Pricing page, saved trades, Make it fair, a scoring toggle and a free-plan counter; clean up the site; redesign it with a navy theme and a referee logo; update the business case.

**Key prompts we gave Copilot (shortened):**

1.  Add a Pricing section with Free, Pro and League Pass and a "no payment is taken" popup.

2.  Add Save trade and a My trade history card with Accepted, Rejected and Delete.

3.  Add Make it fair, the PPR / Half-PPR / Standard toggle and the free plan counter.

4.  Cleanup: fix "100.0% against you", reword the first Why line, and check every section on a phone, the links, the footer, console errors and outside links.

5.  Give the site a professional navy sports-analytics redesign with a referee logo, without changing how it works.

6.  Fix the logo being wiped out when the site name loads, and make the home hero readable.

7.  Replace the referee logo and tab icon with a cleaner striped-jersey SVG.

8.  "Update the business case" (Copilot rewrote the whole file and changed the headings, so I didn't keep that version).

9.  Update only sections 1 and 4 of the business case for the new features, and update the project log.

**What worked:**

The pricing popups, saving trades and marking them accepted or rejected, Make it fair, the scoring toggle, the free plan counter, the navy redesign and the new logo all work on the live site.

**What broke, and how we fixed it:**

See the Things that broke table below.

**Committed?**

Yes. Commit messages:

- Added pricing page

- Added save trade and trade history

- Added make it fair, scoring toggle and free plan counter

- Cleaned up the app making sure it all works well

- Redesigned site with referee logo and navy theme

- Updated business case and project log for session 3

### Session 4 - Nov 27 - driver: Patrick

**Goal for this session:**

Finish the website for submission: add kickers and defenses with realistic roster sizes, make every player name unique, make the home page pitch clearer, test everything on a phone and against the rubric, and finish the business case, project log and reflection.

**Key prompts we gave Copilot (shortened):**

1.  Give every player a unique, realistic-sounding fictional name (no first or last name used more than twice), keeping all ids and stats, and change the Home page pitch to "TradeRef grades every player in a trade offer, tells you if you're winning or losing, and shows whether it fits your team."

2.  Make the fantasy rosters realistic: add 16 kickers, 16 team defenses and more backup QBs, rebuild every roster to 1-2 QB, 3-4 RB, 3-4 WR, 1-2 TE, 1 K and 1 DEF, add K and DEF to Team needs and Fit for your team, and add position filter buttons to the player search.

3.  "The Home page pitch still shows the old sentence because app.js sets it from STARTUP.pitch in data.js." Change it there, and rename one of the two players named "Flynn Oakley".

4.  Finish the business case, project log and reflection in Word and upload the final versions to the project-notes folder.

**What worked:**

Kickers and defenses now show in every roster, in Team needs and in the analyzer's position filters, and a kicker-for-kicker trade grades correctly. The example trades, Make it fair, Save trade, the scoring toggle and the Community page all still work. On my phone, every page loads, every button works and nothing scrolls sideways.

**What broke, and how we fixed it:**

See the Things that broke table below.

**Committed?**

Yes. Commit messages:

- Made player names unique and clarified home pitch

- Added kickers and defenses and realistic roster sizes

- Fuxed home pitch and duplicate player name (typo in the message)

- Final business case and project log

## Things that broke (running list)

| **Date** | **What went wrong**                                                                                                      | **What we tried**                                      | **What finally fixed it**                                                                         |
|----------|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| Nov 24   | The losing example said "You're winning."                                                                                | Checked whether the verdict was backwards (it wasn't). | Changed the losing example's players.                                                             |
| Nov 24   | Git wouldn't let me commit.                                                                                              | Asked Copilot why.                                     | Copilot pulled the GitHub changes into the codespace first.                                       |
| Nov 24   | Giving away a star for two bench players said "You're winning."                                                          | Tested the trade by hand.                              | Used value above replacement (score minus 45).                                                    |
| Nov 25   | My demo team got every top player, so Team needs said Strong everywhere and Fit could never show a fix.                  | Checked the roster on the live site.                   | Snake-draft rosters, with my team weak at RB.                                                     |
| Nov 25   | Fantasy team names were the same as the football team names.                                                             | Noticed it on the roster page.                         | Gave the fantasy teams their own names.                                                           |
| Nov 25   | Example buttons added players who weren't on either roster while a league was loaded.                                    | Tested the analyzer with a league loaded.              | Hid the example buttons while a league is loaded.                                                 |
| Nov 25   | An empty Trading with dropdown showed when no league was loaded.                                                         | Checked the Analyze page after disconnecting.          | Hid the box unless a league is loaded.                                                            |
| Nov 25   | Community trade values dropped in perfect steps and the top 4 were all QBs.                                              | Looked at the table on the live site.                  | Uneven values with mixed positions.                                                               |
| Nov 25   | The business case commit didn't reach GitHub.                                                                            | Checked GitHub and found the old version.              | Clicked Sync Changes after committing.                                                            |
| Nov 26   | The losing example said "100.0% against you" because the other side had 0 trade value.                                   | Noticed it on the live site.                           | Showed the trade value points with "no starter-level value" instead of a percentage.              |
| Nov 26   | The first Why line read "adds 85 trade value to the player you receive."                                                 | Read the results.                                      | Reworded it to "The best player you get / give up is..."                                          |
| Nov 26   | The referee logo disappeared after the site name loaded.                                                                 | Checked how the header name was set.                   | Moved the brand-name id from the link to the text, so the logo stays.                             |
| Nov 26   | The home hero showed light grey behind white text, so it was unreadable.                                                 | Checked the hero background in the preview.            | Fixed the background so it shows a navy gradient with faint yard lines.                           |
| Nov 26   | The first referee logo looked too simple and was hard to recognize at small size.                                        | Compared it in the header.                             | Replaced it with a cleaner striped-jersey logo.                                                   |
| Nov 26   | A short "Update the business case" prompt made Copilot rewrite the whole file, change the headings and add new sections. | Checked the file before submitting.                    | Went back to the earlier version and only updated sections 1 and 4.                               |
| Nov 27   | Player names repeated a lot (one first name was used 10 times and one last name 12 times), which looked fake.            | Counted the names in the rosters.                      | Gave every player a unique name.                                                                  |
| Nov 27   | Rosters had no kickers or defenses, and tight ends were hard to find because the search only showed 8 players.           | Checked My League and the analyzer.                    | Added kickers and defenses, rebuilt the rosters and added position filters with a scrolling list. |
| Nov 27   | The new home page pitch didn't show up on the live site.                                                                 | Checked the live site after committing.                | Found that app.js sets the pitch from data.js, so I changed it there.                             |
| Nov 27   | Two players had the same name ("Flynn Oakley") after the new players were added.                                         | Checked for duplicate names.                           | Renamed one of them.                                                                              |

## What a real version would need

| **Feature we faked or skipped**                                     | **Why a real company would need it**                                                          | **How hard / expensive?**                                                                   |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Real league import through platform APIs, like Sleeper's public API | Managers shouldn't have to type in rosters, and teams need to stay in sync during the season. | Medium. API limits or access changes mean we'd also need support and a manual fallback.     |
| A licensed sports data feed (injuries, analyst projections, usage)  | The grades are only useful with timely, accurate data.                                        | Ongoing subscription; probably one of the biggest costs.                                    |
| User accounts and logins                                            | Each manager needs their own saved settings, league and subscription across devices.          | Low to medium with a login service; needs password recovery, security and account deletion. |
| A shared database (trade history only saves in one browser now)     | Saved leagues and logged trades need to follow the user and feed the community predictions.   | Low to medium monthly cost, plus design work, privacy controls and backups.                 |
| Subscription payments                                               | Needed to charge for Pro and League Pass without relying on sportsbook ads.                   | Low setup cost plus a percentage of each payment; billing and refunds take work.            |
| A real Chance they accept model trained on real trades              | The prototype's estimate is made up; a real one needs real responses and outcomes.            | High difficulty, medium to high cost; needs a data scientist.                               |
| Protecting community values from people gaming them                 | Fake or repeated trade reports could push values the wrong way and hurt trust.                | Medium and ongoing: rate limits, unusual-activity checks and moderation.                    |
| Customer support during the season                                  | Trade deadlines and Sunday injury news create urgent questions and import problems.           | Low to medium; one part-time support person and help articles to start.                     |

## Reflection

**1. What surprised you most about building software with AI?**

What surprised me most was how fast it went. One prompt built the whole trade analyzer, with player search, grades, a verdict and example trades, in a few minutes, and I have no coding background. The other surprise was how confidently it got things wrong. The losing example trade said "You're winning." My demo team got every top player, so Team needs said Strong at every position. Giving away a star for two bench players came back as a win until I switched to value above replacement. Copilot never flagged any of these itself. I only caught them because I tested the site and I know fantasy football well enough to see when a result made no sense.

**2. Which parts were easy, and which were hard? Why do you think that is?**

The look of the site was the easy part. Layouts, colours, new pages like Pricing and Community, and 60 fictional players mostly came out right on the first try. The hard part was making it realistic: value above replacement, snake-draft rosters, and community values that didn't drop in perfect steps. Bugs I couldn't see were hard too, like the logo disappearing because the code rewrote the site name, or the hero turning grey behind white text. Git caught me once as well, when a commit never reached GitHub because I hadn't clicked Sync. I think AI is good at things it has seen thousands of times, like web pages and buttons, but it has no sense of what a fantasy manager would call a fair trade. Specific prompts worked well, while vague ones caused damage: "Update the business case" rewrote the whole file and changed the headings.

**3. If a competitor had the same AI tool, how long would it take them to copy your site?**

Probably a weekend, maybe only a few hours if they saw my prompts. It took me four sessions with no experience, and someone who knows exactly what they want would go faster. That is the biggest business lesson I took from this project. If AI makes software this cheap to build, the website can't be anyone's advantage. For TradeRef, the advantage would have to come from things that take time to build: a season of real accepted and rejected trades, and leagues that already use it together through League Pass. The biggest risk is a large fantasy platform adding a trade grade in a few weeks, because it already has the trade data. AI moves the competition away from the code and toward data and knowing the customer.
