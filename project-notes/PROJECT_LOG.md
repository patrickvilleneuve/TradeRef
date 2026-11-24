# Project log

Keep this up to date as you go — a few lines per work session is enough. It's much harder to reconstruct at the end.

**Team name:** Patrick Villeneuve (Individual Project)
**Startup name:** TradeRef
**Live site link:** https://patrickvilleneuve.github.io/TradeRef/

---

## Work sessions

Copy this block for each session.

### Session — 2026-11-24 — driver: Patrick

- **Goal for this session:** Correct the losing-trade example, resolve the Git sync issue, and document the business case.
- **Key prompts we gave Copilot** (paste the important ones):
  1. “When I click the ‘Try an example’ button for the losing trade, the verdict says ‘You're winning this trade’. It should say ‘You're losing this trade’.”
  2. “Explain why it is not letting me commit my changes, can you help me fix this so I can update the business case and the business log”
  3. “Update the business case”
- **What worked:** Checked that the verdict already compares “You get” against “You give” in the correct direction. Adjusted the losing example and verified that it now lands on a loss by more than 5%, while the winning example remains a win and the fair example stays within 5%. Rebased the local commit onto the remote branch to resolve the divergence without conflicts. Filled in the business case using the current prototype and identified which capabilities are only possibilities for a real service.
- **What broke, and how we fixed it:** The losing example originally gave away one high-value player for three lower-value players, whose combined value made the offer look favorable. Reducing the return to two low-value players makes the example a clear loss without changing the score formula. Git showed a clean working tree and diverged local/remote history; rebasing brought the remote change into the local branch.
- **Committed?** no — the business case and project log updates are not yet committed.

---

## Things that broke (running list)

| Date | What went wrong | What we tried | What finally fixed it |
|---|---|---|---|
| 2026-11-24 | The losing sample trade was graded as a win. | Checked the give/get comparison and the example player values. | Kept the verdict formula and changed the losing example to give one star player for two low-value players; verified all three sample outcomes. |
| 2026-11-24 | Local and remote Git branches had diverged, preventing a clean sync. | Checked the working tree, hooks, and commits on both branches. | Rebased the local commit onto the remote branch; it completed without conflicts. |

## What a real version would need

Everything we wanted but faked or left out — real logins, a real database, payments, security, moderation, an app, staff, etc. For each one, say **why** it's needed and roughly **how hard or expensive** you think it would be.

| Feature we faked or skipped | Why a real company would need it | How hard / expensive? |
|---|---|---|
| | | |

## Reflection (fill in at the end)

1. What surprised you most about building software with AI?
2. Which parts were easy, and which were hard? Why do you think that is?
3. If a competitor had the same AI tool, how long would it take them to copy your site?
