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
  const freePlanBanner = document.getElementById("free-plan-banner");
  const scoringButtons = document.querySelectorAll("[data-scoring]");
  const exampleRow = document.getElementById("example-row");
  const matchup = document.getElementById("team-matchup");
  const tradePartner = document.getElementById("trade-partner");
  const connectCard = document.getElementById("connect-card");
  const leagueDashboard = document.getElementById("league-dashboard");
  const leagueIdInput = document.getElementById("league-id");
  const leagueMessage = document.getElementById("league-message");
  let activeLeague = null;
  let activePartnerId = null;
  let freeAnalysesRemaining = 3;
  let scoringFormat = "Half-PPR";
  let hasAnalyzedTrade = false;

  const starterSlots = { QB: 1, RB: 2, WR: 2, TE: 1 };
  const storageKey = "traderef-loaded-league-v2";
  const managerSlider = document.getElementById("manager-slider");
  const managerCountOutput = document.getElementById("manager-count");
  const leagueMateCountOutput = document.getElementById("league-member-count");
  const removeLeagueMateButton = document.getElementById("remove-league-member");
  const addLeagueMateButton = document.getElementById("add-league-member");
  const prototypeDialog = document.getElementById("prototype-dialog");
  const closePrototypeDialog = document.getElementById("close-prototype-dialog");
  const tradeHistoryList = document.getElementById("trade-history-list");
  const historyNotice = document.getElementById("history-notice");
  const tradeHistoryStorageKey = "traderef-saved-trades-v1";
  let savedTrades = [];
  let currentAnalyzedTrade = null;
  let leagueMateCount = 4;

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function percentageFactor(value, maximum) {
    return clamp((value / maximum) * 100, 0, 100);
  }

  function estimatedReceptionsPerGame(player) {
    const receptionRate = {
      QB: 0,
      RB: 0.15,
      WR: 0.65,
      TE: 0.65
    }[player.position] || 0;
    return player.touchesPerGame * receptionRate;
  }

  function scoringAdjustedPPG(player, points) {
    const receptionPoints = scoringFormat === "PPR" ? 0.5
      : scoringFormat === "Standard" ? -0.5
        : 0;
    return points + estimatedReceptionsPerGame(player) * receptionPoints;
  }

  function updateFreePlanBanner() {
    freePlanBanner.replaceChildren();
    if (freeAnalysesRemaining > 0) {
      freePlanBanner.textContent = "Free plan: " + freeAnalysesRemaining +
        " of 3 analyses left this week";
      return;
    }
    freePlanBanner.append(document.createTextNode("You've used your free analyses. "));
    const upgradeLink = document.createElement("a");
    upgradeLink.href = "#pricing";
    upgradeLink.textContent = "Upgrade to Pro for unlimited";
    freePlanBanner.append(upgradeLink);
  }

  function getTeammateImpact(note) {
    const signedChange = note.match(/([+-])\s*([0-9]+(?:\.[0-9]+)?)/);
    if (signedChange) {
      const amount = Number(signedChange[2]);
      return signedChange[1] === "+" ? amount : -amount;
    }
    const reduction = note.match(/(?:reduction of|fewer)\s*([0-9]+(?:\.[0-9]+)?)/i);
    return reduction ? -Number(reduction[1]) : 0;
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
    const projection = percentageFactor(scoringAdjustedPPG(player, player.projectionPPG), 25);
    const thisSeason = percentageFactor(scoringAdjustedPPG(player, player.thisSeasonPPG), 25);
    const touches = percentageFactor(player.touchesPerGame, 30);
    const usage = (touches + clamp(player.touchShare, 0, 100)) / 2;
    const lastSeason = percentageFactor(scoringAdjustedPPG(player, player.lastSeasonPPG), 25);
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

  function setCommunityMeter(trackId, fillId, value, maximum) {
    const track = document.getElementById(trackId);
    const fill = document.getElementById(fillId);
    track.setAttribute("aria-valuenow", String(value));
    fill.style.width = clamp((value / maximum) * 100, 0, 100) + "%";
  }

  function updateCommunityNetwork() {
    const managers = Number(managerSlider.value);
    const weeklyTrades = Math.round(managers * 0.24);
    const accuracy = 55 + 30 * (1 - Math.exp(-managers / 140000));
    const valuedPlayers = 15 + Math.round(
      (PLAYERS.length - 15) * (1 - Math.exp(-managers / 100000))
    );

    managerCountOutput.textContent = managers.toLocaleString("en-US");
    document.getElementById("weekly-trades").textContent =
      weeklyTrades.toLocaleString("en-US");
    document.getElementById("prediction-accuracy").textContent =
      accuracy.toFixed(1) + "%";
    document.getElementById("valued-player-count").textContent =
      valuedPlayers.toLocaleString("en-US");

    setCommunityMeter("weekly-trades-track", "weekly-trades-bar", weeklyTrades, 120000);
    setCommunityMeter("prediction-accuracy-track", "prediction-accuracy-bar", accuracy, 100);
    setCommunityMeter(
      "valued-player-count-track",
      "valued-player-count-bar",
      valuedPlayers,
      PLAYERS.length
    );
  }

  function setLeagueFeature(featureId, unlocked) {
    const feature = document.getElementById(featureId);
    feature.className = "community-feature " + (unlocked ? "unlocked" : "locked");
    feature.setAttribute("aria-disabled", String(!unlocked));
    feature.querySelector(".feature-lock").textContent = unlocked ? "✓" : "🔒";
  }

  function updateCommunityLeague() {
    leagueMateCountOutput.textContent =
      leagueMateCount + " of 12 managers in your league use TradeRef";
    removeLeagueMateButton.disabled = leagueMateCount <= 1;
    addLeagueMateButton.disabled = leagueMateCount >= 12;
    setLeagueFeature("trade-interest-feature", leagueMateCount >= 6);
    setLeagueFeature("trade-finder-feature", leagueMateCount >= 12);
  }

  function renderCommunityValues() {
    const tableBody = document.getElementById("community-values");
    tableBody.replaceChildren();

    COMMUNITY_TRADE_VALUES.slice().sort(function (a, b) {
      return b.value - a.value;
    }).forEach(function (entry) {
      const player = findPlayer(entry.playerId);
      if (!player) throw new Error("Community trade value references an unknown player.");

      const row = document.createElement("tr");
      const playerCell = document.createElement("td");
      playerCell.className = "community-player-cell";
      playerCell.setAttribute("data-label", "Player");
      const playerName = document.createElement("strong");
      playerName.textContent = player.name;
      const playerPosition = document.createElement("span");
      playerPosition.textContent = player.position;
      playerCell.append(playerName, playerPosition);

      const valueCell = document.createElement("td");
      valueCell.setAttribute("data-label", "Community value");
      valueCell.textContent = String(entry.value);

      const changeCell = document.createElement("td");
      const isDown = entry.weeklyDirection === "down";
      const direction = isDown ? "down" : "up";
      const directionLabel = isDown ? "Down " :
        entry.weeklyChange > 0 ? "Up " : "No change";
      changeCell.className = "community-change " + direction;
      changeCell.setAttribute(
        "aria-label",
        directionLabel + (entry.weeklyChange === 0 ? "" : " " + entry.weeklyChange) +
          " this week"
      );
      changeCell.setAttribute("data-label", "Change this week");
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = isDown ? "↓" : entry.weeklyChange > 0 ? "↑" : "↔";
      const change = document.createElement("span");
      change.setAttribute("aria-hidden", "true");
      change.textContent = (entry.weeklyChange > 0 && !isDown ? "+" : "") +
        entry.weeklyChange;
      changeCell.append(arrow, change);

      const tradesCell = document.createElement("td");
      tradesCell.setAttribute("data-label", "Trades logged");
      tradesCell.textContent = entry.tradesLogged.toLocaleString("en-US");
      row.append(playerCell, valueCell, changeCell, tradesCell);
      tableBody.append(row);
    });
  }

  function findLeagueTeam(teamId) {
    return activeLeague && activeLeague.teams.find(function (team) {
      return team.id === teamId;
    });
  }

  function isValidLeague(league) {
    if (!league || typeof league.leagueId !== "string" ||
        typeof league.myTeamId !== "string" || !Array.isArray(league.teams) ||
        league.teams.length !== 12) return false;
    const allRosterIds = [];
    const validTeams = league.teams.every(function (team) {
      if (!team || typeof team.id !== "string" || typeof team.name !== "string" ||
          typeof team.managerName !== "string" || typeof team.record !== "string" ||
          typeof team.tradeStyle !== "string" || !Array.isArray(team.roster) ||
          team.roster.length !== 15 ||
          team.roster.some(function (id) { return !findPlayer(id); })) return false;
      allRosterIds.push.apply(allRosterIds, team.roster);
      return true;
    });
    return validTeams &&
      league.teams.some(function (team) { return team.id === league.myTeamId; }) &&
      new Set(allRosterIds).size === allRosterIds.length;
  }

  function loadSavedLeague() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (isValidLeague(parsed)) {
        activeLeague = parsed;
        activePartnerId = parsed.teams.find(function (team) {
          return team.id !== parsed.myTeamId;
        }).id;
      } else {
        leagueMessage.textContent = "The saved league data could not be loaded. Connect again to continue.";
      }
    } catch (error) {
      leagueMessage.textContent = "Your saved league could not be read from this browser.";
    }
  }

  function saveLeague(league) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(league));
      return true;
    } catch (error) {
      leagueMessage.textContent = "League loaded for this visit, but your browser could not save it.";
      return false;
    }
  }

  function getLeagueTeams() {
    return activeLeague ? activeLeague.teams : [];
  }

  function getRoster(team) {
    return team.roster.map(findPlayer).filter(Boolean);
  }

  function getLeagueAverage(position) {
    const slotCount = starterSlots[position];
    const teamTotals = getLeagueTeams().map(function (team) {
      return getRoster(team).filter(function (player) {
        return player.position === position;
      }).sort(function (a, b) {
        return scoringAdjustedPPG(b, b.projectionPPG) - scoringAdjustedPPG(a, a.projectionPPG);
      }).slice(0, slotCount).reduce(function (sum, player) {
        return sum + scoringAdjustedPPG(player, player.projectionPPG);
      }, 0);
    });
    return teamTotals.reduce(function (sum, total) {
      return sum + total;
    }, 0) / Math.max(teamTotals.length, 1);
  }

  function getPositionRatings(rosterIds) {
    const roster = rosterIds.map(findPlayer).filter(Boolean);
    return Object.keys(starterSlots).reduce(function (ratings, position) {
      const slotCount = starterSlots[position];
      const total = roster.filter(function (player) {
        return player.position === position;
      }).sort(function (a, b) {
        return scoringAdjustedPPG(b, b.projectionPPG) - scoringAdjustedPPG(a, a.projectionPPG);
      }).slice(0, slotCount).reduce(function (sum, player) {
        return sum + scoringAdjustedPPG(player, player.projectionPPG);
      }, 0);
      const average = getLeagueAverage(position);
      const ratio = total / Math.max(average, 1);
      ratings[position] = {
        total: total,
        average: average,
        rating: ratio >= 1.1 ? "Strong" : ratio < 0.9 ? "Weak" : "OK"
      };
      return ratings;
    }, {});
  }

  function getStartingProjection(rosterIds) {
    const roster = rosterIds.map(findPlayer).filter(Boolean);
    return Object.keys(starterSlots).reduce(function (total, position) {
      return total + roster.filter(function (player) {
        return player.position === position;
      }).sort(function (a, b) {
        return scoringAdjustedPPG(b, b.projectionPPG) - scoringAdjustedPPG(a, a.projectionPPG);
      }).slice(0, starterSlots[position]).reduce(function (sum, player) {
        return sum + scoringAdjustedPPG(player, player.projectionPPG);
      }, 0);
    }, 0);
  }

  function makeRosterGroup(position, players) {
    const group = document.createElement("section");
    group.className = "roster-group";
    const heading = document.createElement("h3");
    heading.textContent = position + " (" + players.length + ")";
    const list = document.createElement("ul");
    players.forEach(function (player) {
      const item = document.createElement("li");
      item.textContent = player.name + " · " +
        scoringAdjustedPPG(player, player.projectionPPG).toFixed(1) + " projected PPG";
      list.append(item);
    });
    group.append(heading, list);
    return group;
  }

  function renderLeagueDashboard() {
    connectCard.hidden = Boolean(activeLeague);
    leagueDashboard.hidden = !activeLeague;
    matchup.hidden = !activeLeague;
    exampleRow.hidden = Boolean(activeLeague);
    if (!activeLeague) return;

    const myTeam = findLeagueTeam(activeLeague.myTeamId);
    const myRoster = getRoster(myTeam);
    document.getElementById("my-team-title").textContent = myTeam.name;
    document.getElementById("my-team-meta").textContent =
      myTeam.managerName + " · " + myTeam.record + " · Trade style: " + myTeam.tradeStyle;

    const rosterContainer = document.getElementById("my-roster");
    rosterContainer.replaceChildren();
    Object.keys(starterSlots).forEach(function (position) {
      const players = myRoster.filter(function (player) {
        return player.position === position;
      }).sort(function (a, b) {
        return scoringAdjustedPPG(b, b.projectionPPG) -
          scoringAdjustedPPG(a, a.projectionPPG);
      });
      rosterContainer.append(makeRosterGroup(position, players));
    });

    const needsContainer = document.getElementById("team-needs");
    needsContainer.replaceChildren();
    const ratings = getPositionRatings(myTeam.roster);
    Object.keys(ratings).forEach(function (position) {
      const row = document.createElement("div");
      row.className = "need-row";
      const label = document.createElement("strong");
      label.textContent = position;
      const comparison = document.createElement("span");
      comparison.textContent = ratings[position].total.toFixed(1) + " vs " +
        ratings[position].average.toFixed(1) + " league avg";
      const status = document.createElement("span");
      status.className = "need-status " + ratings[position].rating.toLowerCase();
      status.textContent = ratings[position].rating;
      row.append(label, comparison, status);
      needsContainer.append(row);
    });

    const leagueTeams = document.getElementById("league-teams");
    leagueTeams.replaceChildren();
    activeLeague.teams.forEach(function (team) {
      const item = document.createElement("article");
      item.className = "league-team";
      const name = document.createElement("strong");
      name.textContent = team.name + (team.id === activeLeague.myTeamId ? " (You)" : "");
      const detail = document.createElement("span");
      detail.textContent = team.managerName + " · " + team.record + " · " + team.tradeStyle;
      item.append(name, detail);
      leagueTeams.append(item);
    });

    const options = activeLeague.teams.filter(function (team) {
      return team.id !== activeLeague.myTeamId;
    });
    if (!options.some(function (team) { return team.id === activePartnerId; })) {
      activePartnerId = options[0].id;
    }
    tradePartner.replaceChildren();
    options.forEach(function (team) {
      const option = document.createElement("option");
      option.value = team.id;
      option.textContent = team.name + " · " + team.managerName;
      tradePartner.append(option);
    });
    tradePartner.value = activePartnerId;
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

    const allowedIds = activeLeague
      ? new Set(isGive
        ? findLeagueTeam(activeLeague.myTeamId).roster
        : (findLeagueTeam(activePartnerId) || { roster: [] }).roster)
      : null;
    const matches = PLAYERS.filter(function (player) {
      return player.name.toLowerCase().includes(query) &&
        (!allowedIds || allowedIds.has(player.id)) &&
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
    hasAnalyzedTrade = false;
    renderLeagueDashboard();
    renderSearch("give");
    renderSearch("get");
    renderSelected("give");
    renderSelected("get");
    const partner = findLeagueTeam(activePartnerId);
    document.getElementById("give-heading").textContent = activeLeague ? "You give · your roster" : "You give";
    document.getElementById("get-heading").textContent = activeLeague
      ? "You get · " + (partner ? partner.name : "their roster")
      : "You get";
    analyzeButton.disabled = give.length === 0 || get.length === 0;
  }

  giveSearch.addEventListener("input", function () { renderSearch("give"); });
  getSearch.addEventListener("input", function () { renderSearch("get"); });
  tradePartner.addEventListener("change", function () {
    activePartnerId = tradePartner.value;
    give.length = 0;
    get.length = 0;
    giveSearch.value = "";
    getSearch.value = "";
    results.replaceChildren();
    renderAll();
  });

  function connectLeague() {
    const league = JSON.parse(JSON.stringify(DEMO_LEAGUE));
    league.leagueId = leagueIdInput.value.trim() || DEMO_LEAGUE.leagueId;
    activeLeague = league;
    activePartnerId = league.teams.find(function (team) {
      return team.id !== league.myTeamId;
    }).id;
    give.length = 0;
    get.length = 0;
    giveSearch.value = "";
    getSearch.value = "";
    leagueMessage.textContent = "";
    saveLeague(league);
    renderAll();
  }

  document.getElementById("load-league").addEventListener("click", connectLeague);
  document.getElementById("demo-league").addEventListener("click", function () {
    leagueIdInput.value = "";
    connectLeague();
  });
  document.getElementById("disconnect-league").addEventListener("click", function () {
    try {
      localStorage.removeItem(storageKey);
      leagueMessage.textContent = "";
    } catch (error) {
      leagueMessage.textContent = "The league was disconnected for this visit, but saved browser data could not be removed.";
    }
    activeLeague = null;
    activePartnerId = null;
    give.length = 0;
    get.length = 0;
    giveSearch.value = "";
    getSearch.value = "";
    results.replaceChildren();
    renderAll();
  });

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

  function getAdjustedSideTotals(giveIds, getIds) {
    const giveTotal = sideTotal(giveIds);
    const getTotal = sideTotal(getIds);
    let giveAdjusted = giveTotal.total;
    let getAdjusted = getTotal.total;
    const giveBest = Math.max.apply(null, giveIds.map(function (id) {
      return calculateTradeValueScore(findPlayer(id)).score;
    }));
    const getBest = Math.max.apply(null, getIds.map(function (id) {
      return calculateTradeValueScore(findPlayer(id)).score;
    }));

    if (giveIds.length === 1 && getIds.length > 1 && giveBest > getBest) {
      giveAdjusted += Math.round(giveBest * 0.08);
    }
    if (getIds.length === 1 && giveIds.length > 1 && getBest > giveBest) {
      getAdjusted += Math.round(getBest * 0.08);
    }
    return { giveAdjusted: giveAdjusted, getAdjusted: getAdjusted };
  }

  function findBalancingSuggestion(giveAdjusted, getAdjusted) {
    const behindSide = giveAdjusted < getAdjusted ? "give" : "get";
    const behindIds = behindSide === "give" ? give : get;
    if (behindIds.length >= 4) return null;

    let availableIds;
    if (activeLeague) {
      const sourceTeam = behindSide === "give"
        ? findLeagueTeam(activeLeague.myTeamId)
        : findLeagueTeam(activePartnerId);
      availableIds = sourceTeam ? sourceTeam.roster : [];
    } else {
      availableIds = PLAYERS.map(function (player) { return player.id; });
    }

    const inTrade = new Set(give.concat(get));
    const possible = availableIds.filter(function (id) {
      return !inTrade.has(id) && findPlayer(id);
    }).map(function (id) {
      const nextGive = behindSide === "give" ? give.concat(id) : give;
      const nextGet = behindSide === "get" ? get.concat(id) : get;
      const totals = getAdjustedSideTotals(nextGive, nextGet);
      const difference = Math.abs(totals.getAdjusted - totals.giveAdjusted) /
        Math.max(totals.giveAdjusted, totals.getAdjusted, 1) * 100;
      return { player: findPlayer(id), percentDifference: difference };
    }).filter(function (candidate) {
      return candidate.percentDifference <= 5;
    }).sort(function (a, b) {
      return a.percentDifference - b.percentDifference;
    });

    return possible.length ? { side: behindSide, player: possible[0].player } : null;
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
    return player.name + " projects for " +
      scoringAdjustedPPG(player, player.projectionPPG).toFixed(1) +
      " fantasy points per game and " + player.touchShare + "% of team touches.";
  }

  function makeLeagueInsights(giveAdjusted, getAdjusted) {
    if (!activeLeague) return null;
    const myTeam = findLeagueTeam(activeLeague.myTeamId);
    const partner = findLeagueTeam(activePartnerId);
    if (!myTeam || !partner) return null;

    const myAfter = myTeam.roster.filter(function (id) {
      return give.indexOf(id) === -1;
    }).concat(get);
    const partnerAfter = partner.roster.filter(function (id) {
      return get.indexOf(id) === -1;
    }).concat(give);
    const myBeforeRatings = getPositionRatings(myTeam.roster);
    const myAfterRatings = getPositionRatings(myAfter);
    const partnerBeforeRatings = getPositionRatings(partner.roster);
    const partnerAfterRatings = getPositionRatings(partnerAfter);
    const repairedNeeds = Object.keys(starterSlots).filter(function (position) {
      return partnerBeforeRatings[position].rating === "Weak" &&
        partnerAfterRatings[position].rating !== "Weak";
    });
    const partnerNewHoles = Object.keys(starterSlots).filter(function (position) {
      return partnerBeforeRatings[position].rating !== "Weak" &&
        partnerAfterRatings[position].rating === "Weak";
    });
    const myFixedNeeds = Object.keys(starterSlots).filter(function (position) {
      return myBeforeRatings[position].rating === "Weak" &&
        myAfterRatings[position].rating !== "Weak";
    });
    const myNewHoles = Object.keys(starterSlots).filter(function (position) {
      return myBeforeRatings[position].rating !== "Weak" &&
        myAfterRatings[position].rating === "Weak";
    });

    const card = document.createElement("section");
    card.className = "league-insights";
    const fit = document.createElement("article");
    fit.className = "card";
    const fitHeading = document.createElement("h2");
    fitHeading.textContent = "Fit for your team";
    const points = document.createElement("p");
    points.className = "fit-points";
    points.textContent = "Starting lineup projection: " +
      getStartingProjection(myTeam.roster).toFixed(1) + " before · " +
      getStartingProjection(myAfter).toFixed(1) + " after";
    const fitReason = document.createElement("p");
    if (myFixedNeeds.length && myNewHoles.length) {
      fitReason.textContent = "Fixes " + myFixedNeeds.join(", ") + ", but creates a new weak " +
        myNewHoles.join(", ") + " position.";
    } else if (myFixedNeeds.length) {
      fitReason.textContent = "Fixes your weak " + myFixedNeeds.join(", ") + " position" +
        (myFixedNeeds.length === 1 ? "" : "s") + " without creating a new hole.";
    } else if (myNewHoles.length) {
      fitReason.textContent = "Creates a new weak " + myNewHoles.join(", ") + " position.";
    } else {
      fitReason.textContent = "Does not fix a weak starting position or create a new hole.";
    }
    fit.append(fitHeading, points, fitReason);

    const acceptance = document.createElement("article");
    acceptance.className = "card acceptance-card";
    const incomingValue = giveAdjusted;
    const outgoingValue = getAdjusted;
    const valueDifference = (incomingValue - outgoingValue) /
      Math.max(incomingValue, outgoingValue, 1);
    const styleAdjustment = {
      Active: 8,
      Picky: -5,
      "Rarely trades": -13
    }[partner.tradeStyle] || 0;
    const acceptanceChance = Math.round(clamp(
      50 + valueDifference * 35 + repairedNeeds.length * 10 -
      partnerNewHoles.length * 10 + styleAdjustment,
      5,
      95
    ));
    const acceptanceHeading = document.createElement("h2");
    acceptanceHeading.textContent = "Chance they accept";
    const chance = document.createElement("strong");
    chance.className = "acceptance-percent";
    chance.textContent = acceptanceChance + "%";
    const meter = document.createElement("div");
    meter.className = "acceptance-meter";
    meter.setAttribute("role", "meter");
    meter.setAttribute("aria-label", "Chance they accept");
    meter.setAttribute("aria-valuemin", "0");
    meter.setAttribute("aria-valuemax", "100");
    meter.setAttribute("aria-valuenow", String(acceptanceChance));
    const fill = document.createElement("div");
    fill.style.width = acceptanceChance + "%";
    meter.append(fill);
    const acceptanceReason = document.createElement("p");
    const needReason = repairedNeeds.length
      ? "it fills their weak " + repairedNeeds.join(", ") + " need"
      : "it does not fill a weak starting need";
    const styleReason = partner.tradeStyle === "Active"
      ? "their Active style is open to deals"
      : partner.tradeStyle === "Picky"
        ? "their Picky style is selective"
        : "their rarely-trading style is cautious about deals";
    acceptanceReason.textContent = "They receive " + incomingValue + " trade value and send " +
      outgoingValue + "; " + needReason + ", and " + styleReason + ".";
    acceptance.append(acceptanceHeading, chance, meter, acceptanceReason);
    card.append(fit, acceptance);
    return card;
  }

  function isValidSavedTrade(trade) {
    return trade && typeof trade.id === "string" &&
      typeof trade.date === "string" && Array.isArray(trade.give) &&
      Array.isArray(trade.get) && trade.give.every(function (name) {
        return typeof name === "string";
      }) && trade.get.every(function (name) {
        return typeof name === "string";
      }) && typeof trade.verdict === "string" &&
      Number.isFinite(trade.percentDifference) && Number.isFinite(Date.parse(trade.date)) &&
      (trade.pointDifference === undefined || Number.isFinite(trade.pointDifference)) &&
      (trade.differenceDirection === undefined || typeof trade.differenceDirection === "string") &&
      (trade.zeroValueSide === undefined || typeof trade.zeroValueSide === "boolean") &&
      (trade.status === null || trade.status === "Accepted" || trade.status === "Rejected");
  }

  function loadSavedTrades() {
    try {
      const saved = localStorage.getItem(tradeHistoryStorageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.every(isValidSavedTrade)) {
        historyNotice.textContent = "Saved trade history could not be loaded.";
        return;
      }
      savedTrades = parsed;
    } catch (error) {
      historyNotice.textContent = "Saved trade history could not be read from this browser.";
    }
  }

  function persistSavedTrades(nextTrades) {
    try {
      localStorage.setItem(tradeHistoryStorageKey, JSON.stringify(nextTrades));
      savedTrades = nextTrades;
      renderTradeHistory();
      return true;
    } catch (error) {
      historyNotice.textContent = "Your browser could not save the trade history.";
      return false;
    }
  }

  function makeHistoryButton(label, className, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", handler);
    return button;
  }

  function renderTradeHistory() {
    tradeHistoryList.replaceChildren();
    if (savedTrades.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "muted";
      emptyMessage.textContent = "No saved trades yet. Analyze a trade and click Save trade.";
      tradeHistoryList.append(emptyMessage);
      return;
    }

    savedTrades.slice().sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }).forEach(function (trade) {
      const item = document.createElement("article");
      item.className = "saved-trade";

      const heading = document.createElement("div");
      heading.className = "saved-trade-heading";
      const date = document.createElement("time");
      date.dateTime = trade.date;
      date.textContent = new Date(trade.date).toLocaleDateString();
      const verdict = document.createElement("strong");
      verdict.className = "saved-trade-verdict";
      const hasZeroValueSide = trade.zeroValueSide === true || trade.percentDifference === 100;
      const differenceSummary = hasZeroValueSide
        ? Number.isFinite(trade.pointDifference)
          ? trade.pointDifference + " trade value points " + trade.differenceDirection +
            ". The other side has no starter-level value."
          : "One side has no starter-level value."
        : trade.percentDifference.toFixed(1) + "% difference";
      verdict.textContent = trade.verdict + " · " + differenceSummary;
      heading.append(date, verdict);
      if (trade.status) {
        const status = document.createElement("span");
        status.className = "trade-status " + trade.status.toLowerCase();
        status.textContent = trade.status;
        heading.append(status);
      }

      const give = document.createElement("p");
      const giveLabel = document.createElement("strong");
      giveLabel.textContent = "You give: ";
      give.append(giveLabel);
      give.append(document.createTextNode(trade.give.join(", ")));
      const get = document.createElement("p");
      const getLabel = document.createElement("strong");
      getLabel.textContent = "You get: ";
      get.append(getLabel);
      get.append(document.createTextNode(trade.get.join(", ")));

      const controls = document.createElement("div");
      controls.className = "saved-trade-controls";
      controls.append(
        makeHistoryButton("Accepted", "history-action", function () {
          updateTradeStatus(trade.id, "Accepted");
        }),
        makeHistoryButton("Rejected", "history-action", function () {
          updateTradeStatus(trade.id, "Rejected");
        }),
        makeHistoryButton("Delete", "history-action delete-trade", function () {
          persistSavedTrades(savedTrades.filter(function (savedTrade) {
            return savedTrade.id !== trade.id;
          }));
        })
      );
      item.append(heading, give, get, controls);
      tradeHistoryList.append(item);
    });
  }

  function updateTradeStatus(id, status) {
    const nextTrades = savedTrades.map(function (trade) {
      if (trade.id !== id) return trade;
      return Object.assign({}, trade, { status: status });
    });
    if (persistSavedTrades(nextTrades)) historyNotice.textContent = "";
  }

  function analyzeTrade(countAnalysis) {
    if (give.length === 0 || get.length === 0) return;
    if (countAnalysis) {
      freeAnalysesRemaining = Math.max(0, freeAnalysesRemaining - 1);
      updateFreePlanBanner();
    }
    const adjustedTotals = getAdjustedSideTotals(give, get);
    const giveAdjusted = adjustedTotals.giveAdjusted;
    const getAdjusted = adjustedTotals.getAdjusted;

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
    } else if (giveAdjusted === 0 || getAdjusted === 0) {
      differenceText.textContent = Math.abs(difference) + " trade value points " +
        (difference > 0 ? "in your favor." : "against you.") +
        " The other side has no starter-level value.";
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

    const leagueInsights = makeLeagueInsights(giveAdjusted, getAdjusted);
    if (leagueInsights) results.append(leagueInsights);

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
    if (absolutePercent <= 5) {
      reasons.push("The best players on each side are closely matched.");
    } else if (difference > 0) {
      const bestScore = calculateTradeValueScore(strongestGet).score;
      reasons.push("The best player you get is " + strongestGet.name + " (score " +
        bestScore + ", trade value " + valueAboveReplacement(bestScore) + ").");
    } else if (difference < 0) {
      const bestScore = calculateTradeValueScore(strongestGive).score;
      reasons.push("The best player you give up is " + strongestGive.name + " (score " +
        bestScore + ", trade value " + valueAboveReplacement(bestScore) + ").");
    } else {
      reasons.push("The best players on each side are closely matched.");
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

    if (absolutePercent > 5) {
      const fairSuggestion = document.createElement("div");
      fairSuggestion.className = "fair-suggestion";
      const makeFairButton = makeHistoryButton("Make it fair", "example-button", function () {
        makeFairButton.disabled = true;
        const suggestion = findBalancingSuggestion(giveAdjusted, getAdjusted);
        if (!suggestion) {
          const message = document.createElement("p");
          message.className = "muted";
          message.textContent = "No single player balances this trade. Try removing a player instead.";
          fairSuggestion.append(message);
          return;
        }

        const player = suggestion.player;
        const grade = calculateTradeValueScore(player).score;
        const card = document.createElement("article");
        card.className = "card fair-suggestion-card";
        const name = document.createElement("h3");
        name.textContent = player.name;
        const detail = document.createElement("p");
        detail.textContent = player.position + " · Score: " + grade +
          " · Trade value: " + valueAboveReplacement(grade);
        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "button";
        addButton.textContent = "Add to trade";
        addButton.addEventListener("click", function () {
          (suggestion.side === "give" ? give : get).push(player.id);
          giveSearch.value = "";
          getSearch.value = "";
          renderAll();
          analyzeTrade(false);
        });
        card.append(name, detail, addButton);
        fairSuggestion.append(card);
      });
      fairSuggestion.append(makeFairButton);
      results.append(fairSuggestion);
    }

    currentAnalyzedTrade = {
      give: give.map(function (id) { return findPlayer(id).name; }),
      get: get.map(function (id) { return findPlayer(id).name; }),
      verdict: verdict,
      percentDifference: absolutePercent,
      pointDifference: Math.abs(difference),
      differenceDirection: difference > 0 ? "in your favor" : "against you",
      zeroValueSide: (giveAdjusted === 0 && getAdjusted > 0) ||
        (getAdjusted === 0 && giveAdjusted > 0)
    };
    const saveControls = document.createElement("div");
    saveControls.className = "save-trade-controls";
    const saveButton = makeHistoryButton("Save trade", "button", function () {
      const now = new Date().toISOString();
      const trade = Object.assign({
        id: now + "-" + Math.random().toString(36).slice(2),
        date: now,
        status: null
      }, currentAnalyzedTrade);
      if (persistSavedTrades([trade].concat(savedTrades))) {
        historyNotice.textContent = "Trade saved";
        saveMessage.textContent = "Trade saved";
      } else {
        saveMessage.textContent = "Trade could not be saved.";
      }
    });
    const saveMessage = document.createElement("span");
    saveMessage.className = "save-trade-message";
    saveControls.append(saveButton, saveMessage);
    results.append(saveControls);
    results.hidden = false;
    hasAnalyzedTrade = true;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  analyzeButton.addEventListener("click", function () {
    analyzeTrade(true);
  });

  scoringButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedFormat = button.getAttribute("data-scoring");
      if (scoringFormat === selectedFormat) return;
      scoringFormat = selectedFormat;
      scoringButtons.forEach(function (scoringButton) {
        const selected = scoringButton === button;
        scoringButton.classList.toggle("selected", selected);
        scoringButton.setAttribute("aria-pressed", String(selected));
      });
      renderLeagueDashboard();
      if (hasAnalyzedTrade) analyzeTrade(false);
    });
  });

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
      analyzeTrade(false);
    });
  });

  leagueIdInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") connectLeague();
  });

  managerSlider.addEventListener("input", updateCommunityNetwork);
  removeLeagueMateButton.addEventListener("click", function () {
    leagueMateCount = Math.max(1, leagueMateCount - 1);
    updateCommunityLeague();
  });
  addLeagueMateButton.addEventListener("click", function () {
    leagueMateCount = Math.min(12, leagueMateCount + 1);
    updateCommunityLeague();
  });
  document.querySelectorAll("[data-plan-button]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (typeof prototypeDialog.showModal === "function") {
        prototypeDialog.showModal();
      } else {
        prototypeDialog.setAttribute("open", "");
      }
    });
  });
  closePrototypeDialog.addEventListener("click", function () {
    if (typeof prototypeDialog.close === "function") {
      prototypeDialog.close();
    } else {
      prototypeDialog.removeAttribute("open");
    }
  });

  renderCommunityValues();
  updateFreePlanBanner();
  loadSavedTrades();
  renderTradeHistory();
  updateCommunityNetwork();
  updateCommunityLeague();
  loadSavedLeague();
  renderAll();
  showView();
})();
