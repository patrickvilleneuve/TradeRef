// app.js — TradeRef navigation and trade analyzer.
// Plain JavaScript, no libraries, no installs.

(function () {
  "use strict";

  document.title = STARTUP.name;
  document.getElementById("brand-name").textContent = STARTUP.name;
  document.getElementById("tagline").textContent = STARTUP.tagline;
  document.getElementById("pitch").textContent = STARTUP.pitch;

  function showView() {
    const requested = (window.location.hash || "#home").slice(1);
    const views = document.querySelectorAll("[data-view]");
    const exists = Array.prototype.some.call(views, function (view) {
      return view.id === requested;
    });
    const current = exists ? requested : "home";

    views.forEach(function (view) {
      view.hidden = view.id !== current;
    });

    document.querySelectorAll("nav a").forEach(function (link) {
      if (link.getAttribute("href") === "#" + current) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", showView);

  const give = [];
  const get = [];
  const giveSearch = document.getElementById("give-search");
  const getSearch = document.getElementById("get-search");
  const giveResults = document.getElementById("give-results");
  const getResults = document.getElementById("get-results");
  const giveSelected = document.getElementById("give-selected");
  const getSelected = document.getElementById("get-selected");
  const analyzeButton = document.getElementById("analyze-button");
  const resetButton = document.getElementById("reset-button");
  const results = document.getElementById("trade-results");

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function percentageFactor(value, maximum) {
    return clamp((value / maximum) * 100, 0, 100);
  }

  function getTeammateImpact(note) {
    const match = note.match(/[+-]\s*([0-9]+(?:\.[0-9]+)?)/);
    if (!match) return 0;
    const amount = Number(match[1]);
    return note[match.index] === "+" ? amount : -amount;
  }

  function calculateInjuryFactor(player) {
    const base = {
      Healthy: 100,
      Questionable: 75,
      Out: 45,
      IR: 20
    }[player.injuryStatus] || 100;
    const weekPenalty = player.expectedWeeksOut * (player.injuryStatus === "IR" ? 5 : 4);
    return clamp(base - weekPenalty, 0, 100);
  }

  // Single formula function: adjust these weights to tune TradeRef's player grades.
  function calculateTradeValueScore(player) {
    const projection = percentageFactor(player.projectionPPG, 25);
    const thisSeason = percentageFactor(player.thisSeasonPPG, 25);
    const touches = percentageFactor(player.touchesPerGame, 30);
    const usage = (touches + clamp(player.touchShare, 0, 100)) / 2;
    const lastSeason = percentageFactor(player.lastSeasonPPG, 25);
    const injury = calculateInjuryFactor(player);
    const teammateImpact = clamp(50 + getTeammateImpact(player.injuredTeammates) * 8, 0, 100);

    const score = (
      projection * 0.30 +
      thisSeason * 0.20 +
      usage * 0.15 +
      lastSeason * 0.10 +
      injury * 0.15 +
      teammateImpact * 0.10
    );

    return {
      score: Math.round(clamp(score, 0, 100)),
      factors: {
        projection: Math.round(projection),
        thisSeason: Math.round(thisSeason),
        usage: Math.round(usage),
        lastSeason: Math.round(lastSeason),
        injury: Math.round(injury),
        teammateImpact: Math.round(teammateImpact)
      }
    };
  }

  function valueAboveReplacement(score) {
    return Math.max(score - 45, 0);
  }

  function getLetterGrade(score) {
    if (score >= 93) return "A+";
    if (score >= 90) return "A";
    if (score >= 87) return "A-";
    if (score >= 84) return "B+";
    if (score >= 80) return "B";
    if (score >= 77) return "B-";
    if (score >= 74) return "C+";
    if (score >= 70) return "C";
    if (score >= 67) return "C-";
    if (score >= 64) return "D+";
    if (score >= 60) return "D";
    if (score >= 57) return "D-";
    return "F";
  }

  function findPlayer(id) {
    return PLAYERS.find(function (player) { return player.id === id; });
  }

  function renderSearch(side) {
    const isGive = side === "give";
    const search = isGive ? giveSearch : getSearch;
    const container = isGive ? giveResults : getResults;
    const selected = isGive ? give : get;
    const query = search.value.trim().toLowerCase();
    container.replaceChildren();

    if (selected.length >= 4) {
      const message = document.createElement("p");
      message.className = "search-limit";
      message.textContent = "Maximum 4 players.";
      container.append(message);
      return;
    }

    const matches = PLAYERS.filter(function (player) {
      return player.name.toLowerCase().includes(query) &&
        selected.indexOf(player.id) === -1;
    }).slice(0, 8);

    matches.forEach(function (player) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "search-result";
      button.setAttribute("role", "option");
      button.innerHTML = "";
      const name = document.createElement("strong");
      name.textContent = player.name;
      const detail = document.createElement("span");
      detail.textContent = player.position + " · " + player.team;
      button.append(name, detail);
      button.addEventListener("click", function () {
        if (selected.length < 4 && selected.indexOf(player.id) === -1) {
          selected.push(player.id);
          search.value = "";
          renderAll();
        }
      });
      container.append(button);
    });
  }

  function renderSelected(side) {
    const isGive = side === "give";
    const container = isGive ? giveSelected : getSelected;
    const selected = isGive ? give : get;
    container.replaceChildren();

    if (selected.length === 0) {
      const empty = document.createElement("p");
      empty.className = "selected-empty";
      empty.textContent = "No players added";
      container.append(empty);
      return;
    }

    selected.forEach(function (id) {
      const player = findPlayer(id);
      const chip = document.createElement("div");
      chip.className = "player-chip";
      const text = document.createElement("span");
      text.textContent = player.name + " · " + player.position;
      const remove = document.createElement("button");
      remove.type = "button";
      remove.setAttribute("aria-label", "Remove " + player.name);
      remove.textContent = "×";
      remove.addEventListener("click", function () {
        const index = selected.indexOf(id);
        if (index !== -1) selected.splice(index, 1);
        results.hidden = true;
        renderAll();
      });
      chip.append(text, remove);
      container.append(chip);
    });
  }

  function renderAll() {
    results.hidden = true;
    renderSearch("give");
    renderSearch("get");
    renderSelected("give");
    renderSelected("get");
    analyzeButton.disabled = give.length === 0 || get.length === 0;
  }

  giveSearch.addEventListener("input", function () { renderSearch("give"); });
  getSearch.addEventListener("input", function () { renderSearch("get"); });

  function makeFactorBar(label, weight, value) {
    const row = document.createElement("div");
    row.className = "factor-row";
    const heading = document.createElement("div");
    heading.className = "factor-heading";
    const name = document.createElement("span");
    name.textContent = label;
    const weightLabel = document.createElement("span");
    weightLabel.textContent = weight + "% · " + value;
    heading.append(name, weightLabel);
    const track = document.createElement("div");
    track.className = "factor-track";
    const fill = document.createElement("div");
    fill.className = "factor-fill";
    fill.style.width = value + "%";
    track.append(fill);
    row.append(heading, track);
    return row;
  }

  function makePlayerCard(player) {
    const graded = calculateTradeValueScore(player);
    const card = document.createElement("article");
    card.className = "graded-player";
    const heading = document.createElement("div");
    heading.className = "graded-player-heading";
    const identity = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = player.name;
    const meta = document.createElement("p");
    meta.textContent = player.position + " · " + player.team;
    const tradeValue = document.createElement("p");
    tradeValue.textContent = "Trade value: " + valueAboveReplacement(graded.score);
    identity.append(name, meta, tradeValue);
    const score = document.createElement("div");
    score.className = "trade-score";
    const scoreNumber = document.createElement("strong");
    scoreNumber.textContent = graded.score;
    const grade = document.createElement("span");
    grade.textContent = getLetterGrade(graded.score);
    score.append(scoreNumber, grade);
    heading.append(identity, score);
    card.append(heading);

    card.append(makeFactorBar("Rest of season", 30, graded.factors.projection));
    card.append(makeFactorBar("This season PPG", 20, graded.factors.thisSeason));
    card.append(makeFactorBar("Usage / touch share", 15, graded.factors.usage));
    card.append(makeFactorBar("Last season PPG", 10, graded.factors.lastSeason));
    card.append(makeFactorBar("Injury adjustment", 15, graded.factors.injury));
    card.append(makeFactorBar("Teammate injury", 10, graded.factors.teammateImpact));
    return card;
  }

  function sideTotal(ids) {
    const raw = ids.reduce(function (sum, id) {
      return sum + valueAboveReplacement(calculateTradeValueScore(findPlayer(id)).score);
    }, 0);
    return { total: raw, raw: raw, bestBonus: 0 };
  }

  function makeReason(player, sideName) {
    if (player.injuryStatus !== "Healthy" && player.expectedWeeksOut > 0) {
      return player.name + " is " + player.injuryStatus + ", with analysts expecting " +
        player.expectedWeeksOut + " week" + (player.expectedWeeksOut === 1 ? "" : "s") + " out.";
    }
    const impact = getTeammateImpact(player.injuredTeammates);
    if (impact > 0) {
      return player.name + " gets a role boost: " + player.injuredTeammates + ".";
    }
    if (impact < 0) {
      return player.name + " may lose some opportunity: " + player.injuredTeammates + ".";
    }
    return player.name + " projects for " + player.projectionPPG +
      " fantasy points per game and " + player.touchShare + "% of team touches.";
  }

  function analyzeTrade() {
    if (give.length === 0 || get.length === 0) return;
    const giveTotal = sideTotal(give);
    const getTotal = sideTotal(get);

    let giveAdjusted = giveTotal.total;
    let getAdjusted = getTotal.total;
    const giveBest = Math.max.apply(null, give.map(function (id) {
      return calculateTradeValueScore(findPlayer(id)).score;
    }));
    const getBest = Math.max.apply(null, get.map(function (id) {
      return calculateTradeValueScore(findPlayer(id)).score;
    }));

    if (give.length === 1 && get.length > 1 && giveBest > getBest) {
      giveAdjusted += Math.round(giveBest * 0.08);
    }
    if (get.length === 1 && give.length > 1 && getBest > giveBest) {
      getAdjusted += Math.round(getBest * 0.08);
    }

    const difference = getAdjusted - giveAdjusted;
    const percentDifference = ((difference / Math.max(giveAdjusted, getAdjusted, 1)) * 100);
    const absolutePercent = Math.abs(percentDifference);
    let verdict;
    let tone;
    if (absolutePercent <= 5) {
      verdict = "Fair trade";
      tone = "fair";
    } else if (difference > 0) {
      verdict = "You're winning this trade";
      tone = "win";
    } else {
      verdict = "You're losing this trade";
      tone = "loss";
    }

    results.replaceChildren();
    const banner = document.createElement("div");
    banner.className = "verdict-banner " + tone;
    const verdictTitle = document.createElement("h2");
    verdictTitle.textContent = verdict;
    const differenceText = document.createElement("p");
    if (absolutePercent <= 5) {
      differenceText.textContent = "The totals differ by " + absolutePercent.toFixed(1) + "%.";
    } else {
      differenceText.textContent = Math.abs(difference) + " trade value points, " +
        absolutePercent.toFixed(1) + "% " + (difference > 0 ? "in your favor." : "against you.");
    }
    banner.append(verdictTitle, differenceText);

    const meter = document.createElement("div");
    meter.className = "verdict-meter";
    const meterGive = document.createElement("div");
    meterGive.className = "meter-give";
    const meterGet = document.createElement("div");
    meterGet.className = "meter-get";
    const total = Math.max(giveAdjusted + getAdjusted, 1);
    meterGive.style.width = (giveAdjusted / total * 100) + "%";
    meterGet.style.width = (getAdjusted / total * 100) + "%";
    meter.append(meterGive, meterGet);
    banner.append(meter);
    results.append(banner);

    const totals = document.createElement("div");
    totals.className = "trade-totals";
    const giveTotalCard = document.createElement("div");
    giveTotalCard.className = "total-card";
    giveTotalCard.innerHTML = "<span>You give</span><strong>" + giveAdjusted + "</strong>";
    const getTotalCard = document.createElement("div");
    getTotalCard.className = "total-card";
    getTotalCard.innerHTML = "<span>You get</span><strong>" + getAdjusted + "</strong>";
    totals.append(giveTotalCard, getTotalCard);
    results.append(totals);

    const sides = document.createElement("div");
    sides.className = "graded-sides";
    ["give", "get"].forEach(function (side) {
      const sideColumn = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = side === "give" ? "You give" : "You get";
      sideColumn.append(heading);
      (side === "give" ? give : get).forEach(function (id) {
        sideColumn.append(makePlayerCard(findPlayer(id)));
      });
      sides.append(sideColumn);
    });
    results.append(sides);

    const why = document.createElement("div");
    why.className = "why-card";
    const whyHeading = document.createElement("h2");
    whyHeading.textContent = "Why";
    why.append(whyHeading);

    const allPlayers = give.concat(get).map(findPlayer);
    const playerReasons = allPlayers.map(function (player) {
      const graded = calculateTradeValueScore(player);
      return { player: player, score: graded.score, text: makeReason(player) };
    }).sort(function (a, b) { return b.score - a.score; });

    const reasons = [];
    const strongestGive = give.map(findPlayer).sort(function (a, b) {
      return calculateTradeValueScore(b).score - calculateTradeValueScore(a).score;
    })[0];
    const strongestGet = get.map(findPlayer).sort(function (a, b) {
      return calculateTradeValueScore(b).score - calculateTradeValueScore(a).score;
    })[0];
    if (difference > 0) {
      reasons.push(strongestGet.name + " adds " +
        calculateTradeValueScore(strongestGet).score + " trade value to the player you receive.");
    } else if (difference < 0) {
      reasons.push(strongestGive.name + " is worth " +
        calculateTradeValueScore(strongestGive).score + " and is leaving your roster.");
    } else {
      reasons.push("The strongest player on both sides is closely matched.");
    }
    reasons.push(makeReason(strongestGet));
    reasons.push(makeReason(strongestGive));

    reasons.slice(0, 3).forEach(function (text) {
      const reason = document.createElement("p");
      reason.text = text;
      reason.textContent = "• " + text;
      why.append(reason);
    });
    results.append(why);
    results.hidden = false;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  analyzeButton.addEventListener("click", analyzeTrade);

  resetButton.addEventListener("click", function () {
    give.length = 0;
    get.length = 0;
    giveSearch.value = "";
    getSearch.value = "";
    results.hidden = true;
    results.replaceChildren();
    renderAll();
  });

  document.querySelectorAll("[data-example]").forEach(function (button) {
    button.addEventListener("click", function () {
      give.length = 0;
      get.length = 0;
      const examples = {
        winning: { give: [30, 31, 32], get: [13, 33] },
        fair: { give: [33, 40], get: [13, 50] },
        losing: { give: [13], get: [30, 31] }
      };
      const example = examples[button.getAttribute("data-example")];
      Array.prototype.push.apply(give, example.give);
      Array.prototype.push.apply(get, example.get);
      giveSearch.value = "";
      getSearch.value = "";
      results.hidden = true;
      renderAll();
      analyzeTrade();
    });
  });

  renderAll();
  showView();
})();
