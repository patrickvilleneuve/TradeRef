// Fictional TradeRef teams and players for a half-PPR redraft league.

const STARTUP = {
  name: "TradeRef",
  tagline: "Know if you're winning the trade before you hit accept.",
  pitch: "TradeRef grades every player in a trade offer, tells you if you're winning or losing, and shows whether it fits your team."
};

const TEAMS = [
  "Arbor City Owls",
  "Bay Harbor Tides",
  "Copper Ridge Navigators",
  "Cedar Grove Wolves",
  "Desert Palm Coyotes",
  "Eastport Anchors",
  "Frost Lake Lynx",
  "Granite Falls Meteors",
  "Highland Pines Hawks",
  "Lakeshore Comets",
  "Maple Valley Foxes",
  "Mesa Verde Stallions",
  "Northstar Wolves",
  "Redwood Coast Kings",
  "Silver Sands Fireflies",
  "Stonebridge Voyagers"
];

const PLAYERS = [
  // Quarterbacks
  { id: 1, name: "Mason Calder", position: "QB", team: "Arbor City Owls", age: 28, byeWeek: 7, thisSeasonPPG: 24.8, lastSeasonPPG: 22.1, projectionPPG: 23.9, touchesPerGame: 31.2, touchShare: 71, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 out 2 weeks: +3.2 pass attempts/game" },
  { id: 2, name: "Jalen Rowe", position: "QB", team: "Bay Harbor Tides", age: 26, byeWeek: 9, thisSeasonPPG: 22.6, lastSeasonPPG: 20.4, projectionPPG: 22.1, touchesPerGame: 30.1, touchShare: 69, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting TE out 1 week: +1.8 pass attempts/game" },
  { id: 3, name: "Owen Mercer", position: "QB", team: "Copper Ridge Navigators", age: 31, byeWeek: 5, thisSeasonPPG: 21.9, lastSeasonPPG: 23.2, projectionPPG: 21.7, touchesPerGame: 29.8, touchShare: 68, injuryStatus: "Questionable", expectedWeeksOut: 1, injuredTeammates: "RB1 out 3 weeks: +5.4 pass attempts/game" },
  { id: 4, name: "Theo Vance", position: "QB", team: "Cedar Grove Wolves", age: 24, byeWeek: 11, thisSeasonPPG: 20.5, lastSeasonPPG: 17.8, projectionPPG: 21.3, touchesPerGame: 28.9, touchShare: 66, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "None: full receiving corps active" },
  { id: 5, name: "Andre Knox", position: "QB", team: "Desert Palm Coyotes", age: 29, byeWeek: 6, thisSeasonPPG: 19.7, lastSeasonPPG: 21.0, projectionPPG: 19.5, touchesPerGame: 28.4, touchShare: 65, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting guard out 2 weeks: no meaningful volume change" },
  { id: 6, name: "Liam Rivers", position: "QB", team: "Eastport Anchors", age: 27, byeWeek: 12, thisSeasonPPG: 18.9, lastSeasonPPG: 19.4, projectionPPG: 18.6, touchesPerGame: 27.6, touchShare: 63, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR2 out 4 weeks: +2.7 targets to slot receiver" },
  { id: 7, name: "Cruz Bennett", position: "QB", team: "Frost Lake Lynx", age: 23, byeWeek: 8, thisSeasonPPG: 17.8, lastSeasonPPG: 14.2, projectionPPG: 18.2, touchesPerGame: 26.8, touchShare: 61, injuryStatus: "Questionable", expectedWeeksOut: 1, injuredTeammates: "Top RB out 1 week: +6.1 pass attempts/game" },
  { id: 8, name: "Nolan Pierce", position: "QB", team: "Granite Falls Meteors", age: 30, byeWeek: 10, thisSeasonPPG: 16.9, lastSeasonPPG: 17.1, projectionPPG: 16.7, touchesPerGame: 25.9, touchShare: 59, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "No active skill-position injuries" },
  { id: 9, name: "Bryce Holloway", position: "QB", team: "Highland Pines Hawks", age: 25, byeWeek: 14, thisSeasonPPG: 15.8, lastSeasonPPG: 15.3, projectionPPG: 16.1, touchesPerGame: 24.7, touchShare: 57, injuryStatus: "Out", expectedWeeksOut: 2, injuredTeammates: "Starting WR out 2 weeks: +4.0 pass attempts to WR2" },
  { id: 10, name: "Micah Stone", position: "QB", team: "Lakeshore Comets", age: 22, byeWeek: 13, thisSeasonPPG: 14.6, lastSeasonPPG: 11.9, projectionPPG: 15.2, touchesPerGame: 24.1, touchShare: 55, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "No projected teammate role changes" },
  { id: 11, name: "Drew Lennox", position: "QB", team: "Maple Valley Foxes", age: 34, byeWeek: 6, thisSeasonPPG: 13.9, lastSeasonPPG: 16.5, projectionPPG: 14.0, touchesPerGame: 23.5, touchShare: 54, injuryStatus: "IR", expectedWeeksOut: 4, injuredTeammates: "QB status leaves backup with most passing attempts" },
  { id: 12, name: "Caleb Arden", position: "QB", team: "Mesa Verde Stallions", age: 25, byeWeek: 7, thisSeasonPPG: 12.8, lastSeasonPPG: 12.4, projectionPPG: 13.1, touchesPerGame: 22.8, touchShare: 52, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Backup RB out 1 week: fewer checkdowns" },

  // Running backs
  { id: 13, name: "Malik Rowan", position: "RB", team: "Northstar Wolves", age: 24, byeWeek: 8, thisSeasonPPG: 21.4, lastSeasonPPG: 18.7, projectionPPG: 21.0, touchesPerGame: 23.1, touchShare: 82, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "RB2 out 3 weeks: +4.2 touches/game" },
  { id: 14, name: "Darius Holt", position: "RB", team: "Redwood Coast Kings", age: 27, byeWeek: 10, thisSeasonPPG: 19.8, lastSeasonPPG: 20.2, projectionPPG: 19.6, touchesPerGame: 21.8, touchShare: 78, injuryStatus: "Questionable", expectedWeeksOut: 1, injuredTeammates: "FB out 2 weeks: +1.1 targets/game" },
  { id: 15, name: "Emmett Vale", position: "RB", team: "Silver Sands Fireflies", age: 25, byeWeek: 5, thisSeasonPPG: 18.7, lastSeasonPPG: 16.9, projectionPPG: 18.9, touchesPerGame: 20.4, touchShare: 74, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 out 4 weeks: +1.4 checkdowns/game" },
  { id: 16, name: "Victor Sato", position: "RB", team: "Stonebridge Voyagers", age: 23, byeWeek: 12, thisSeasonPPG: 17.9, lastSeasonPPG: 14.1, projectionPPG: 18.3, touchesPerGame: 19.7, touchShare: 71, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting TE on IR: +1.3 targets/game" },
  { id: 17, name: "Tanner Brooks", position: "RB", team: "Arbor City Owls", age: 29, byeWeek: 7, thisSeasonPPG: 16.8, lastSeasonPPG: 17.5, projectionPPG: 16.5, touchesPerGame: 18.9, touchShare: 68, injuryStatus: "Out", expectedWeeksOut: 2, injuredTeammates: "RB2 out 1 week: no extra role available" },
  { id: 18, name: "Kendrick Wills", position: "RB", team: "Bay Harbor Tides", age: 26, byeWeek: 9, thisSeasonPPG: 15.9, lastSeasonPPG: 15.2, projectionPPG: 16.1, touchesPerGame: 17.8, touchShare: 64, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting QB questionable: possible reduction of 1.8 touches/game" },
  { id: 19, name: "Roman Dial", position: "RB", team: "Copper Ridge Navigators", age: 24, byeWeek: 5, thisSeasonPPG: 15.1, lastSeasonPPG: 12.8, projectionPPG: 15.6, touchesPerGame: 17.2, touchShare: 62, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "QB1 out 1 week: +2.4 carries/game" },
  { id: 20, name: "Isaiah North", position: "RB", team: "Cedar Grove Wolves", age: 28, byeWeek: 11, thisSeasonPPG: 14.4, lastSeasonPPG: 15.8, projectionPPG: 14.2, touchesPerGame: 16.5, touchShare: 60, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR2 out 3 weeks: 0.8 fewer targets/game" },
  { id: 21, name: "Rafael Wynn", position: "RB", team: "Desert Palm Coyotes", age: 21, byeWeek: 6, thisSeasonPPG: 13.7, lastSeasonPPG: 8.9, projectionPPG: 14.3, touchesPerGame: 15.8, touchShare: 58, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Lead RB out 2 weeks: +6.6 touches/game" },
  { id: 22, name: "Marcus Reeve", position: "RB", team: "Eastport Anchors", age: 27, byeWeek: 12, thisSeasonPPG: 12.9, lastSeasonPPG: 13.4, projectionPPG: 13.1, touchesPerGame: 14.9, touchShare: 55, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "RB3 active: no added role this week" },
  { id: 23, name: "Cole Barrett", position: "RB", team: "Frost Lake Lynx", age: 22, byeWeek: 8, thisSeasonPPG: 12.2, lastSeasonPPG: 9.6, projectionPPG: 12.8, touchesPerGame: 14.2, touchShare: 53, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting RB questionable: +3.1 touches/game" },
  { id: 24, name: "Xavier Ford", position: "RB", team: "Granite Falls Meteors", age: 25, byeWeek: 10, thisSeasonPPG: 11.6, lastSeasonPPG: 10.9, projectionPPG: 11.8, touchesPerGame: 13.6, touchShare: 50, injuryStatus: "Questionable", expectedWeeksOut: 1, injuredTeammates: "Lead RB out 4 weeks: +5.8 touches/game" },
  { id: 25, name: "Brandon Cruz", position: "RB", team: "Highland Pines Hawks", age: 30, byeWeek: 14, thisSeasonPPG: 10.8, lastSeasonPPG: 12.1, projectionPPG: 10.6, touchesPerGame: 12.9, touchShare: 47, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting WR out 2 weeks: no role change" },
  { id: 26, name: "Aiden Shaw", position: "RB", team: "Lakeshore Comets", age: 23, byeWeek: 13, thisSeasonPPG: 9.9, lastSeasonPPG: 7.4, projectionPPG: 10.4, touchesPerGame: 12.1, touchShare: 44, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "RB1 questionable: +2.7 touches/game" },
  { id: 27, name: "Nico Palmer", position: "RB", team: "Maple Valley Foxes", age: 26, byeWeek: 6, thisSeasonPPG: 9.2, lastSeasonPPG: 10.1, projectionPPG: 9.0, touchesPerGame: 11.4, touchShare: 42, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "FB out 1 week: goal-line carries split" },
  { id: 28, name: "Leon Cross", position: "RB", team: "Mesa Verde Stallions", age: 24, byeWeek: 7, thisSeasonPPG: 8.5, lastSeasonPPG: 8.1, projectionPPG: 8.8, touchesPerGame: 10.7, touchShare: 39, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "No active teammate injuries" },
  { id: 29, name: "Samuel Ivey", position: "RB", team: "Northstar Wolves", age: 28, byeWeek: 8, thisSeasonPPG: 7.8, lastSeasonPPG: 9.3, projectionPPG: 7.6, touchesPerGame: 9.8, touchShare: 36, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starter out 3 weeks: +2.1 touches/game" },
  { id: 30, name: "Tyrell Morrow", position: "RB", team: "Redwood Coast Kings", age: 22, byeWeek: 10, thisSeasonPPG: 6.9, lastSeasonPPG: 5.2, projectionPPG: 7.2, touchesPerGame: 8.9, touchShare: 33, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting RB out 1 week: +3.4 touches/game" },
  { id: 31, name: "Eli Doran", position: "RB", team: "Silver Sands Fireflies", age: 27, byeWeek: 5, thisSeasonPPG: 6.1, lastSeasonPPG: 7.0, projectionPPG: 6.3, touchesPerGame: 8.1, touchShare: 30, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "No meaningful teammate absences" },
  { id: 32, name: "Jon Bellamy", position: "RB", team: "Stonebridge Voyagers", age: 25, byeWeek: 12, thisSeasonPPG: 5.4, lastSeasonPPG: 6.2, projectionPPG: 5.7, touchesPerGame: 7.2, touchShare: 27, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "No role because primary back is healthy" },

  // Wide receivers
  { id: 33, name: "Jaylen Frost", position: "WR", team: "Arbor City Owls", age: 26, byeWeek: 7, thisSeasonPPG: 20.6, lastSeasonPPG: 17.9, projectionPPG: 20.2, touchesPerGame: 9.4, touchShare: 25, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Slot WR out 2 weeks: +2.1 targets/game" },
  { id: 34, name: "Cam Porter", position: "WR", team: "Bay Harbor Tides", age: 24, byeWeek: 9, thisSeasonPPG: 19.2, lastSeasonPPG: 16.5, projectionPPG: 18.8, touchesPerGame: 8.9, touchShare: 23, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR2 out 1 week: +1.8 targets/game" },
  { id: 35, name: "Dante Miles", position: "WR", team: "Copper Ridge Navigators", age: 28, byeWeek: 5, thisSeasonPPG: 18.1, lastSeasonPPG: 18.8, projectionPPG: 17.7, touchesPerGame: 8.6, touchShare: 22, injuryStatus: "Questionable", expectedWeeksOut: 1, injuredTeammates: "Starting TE out 3 weeks: +1.5 targets/game" },
  { id: 36, name: "Parker Quinn", position: "WR", team: "Cedar Grove Wolves", age: 23, byeWeek: 11, thisSeasonPPG: 17.3, lastSeasonPPG: 14.2, projectionPPG: 17.5, touchesPerGame: 8.4, touchShare: 21, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 out 4 weeks: +3.6 targets/game" },
  { id: 37, name: "Zane Archer", position: "WR", team: "Desert Palm Coyotes", age: 27, byeWeek: 6, thisSeasonPPG: 16.4, lastSeasonPPG: 15.9, projectionPPG: 16.1, touchesPerGame: 8.1, touchShare: 20, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "No active receiver injuries" },
  { id: 38, name: "Jamal Keene", position: "WR", team: "Eastport Anchors", age: 25, byeWeek: 12, thisSeasonPPG: 15.5, lastSeasonPPG: 13.7, projectionPPG: 15.8, touchesPerGame: 7.8, touchShare: 19, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Slot WR out 2 weeks: no role change" },
  { id: 39, name: "Reece Maddox", position: "WR", team: "Frost Lake Lynx", age: 22, byeWeek: 8, thisSeasonPPG: 14.7, lastSeasonPPG: 10.8, projectionPPG: 15.1, touchesPerGame: 7.5, touchShare: 18, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 out 1 week: +4.0 targets/game" },
  { id: 40, name: "Grant Lowell", position: "WR", team: "Granite Falls Meteors", age: 29, byeWeek: 10, thisSeasonPPG: 13.9, lastSeasonPPG: 14.8, projectionPPG: 13.6, touchesPerGame: 7.2, touchShare: 18, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting TE out 2 weeks: +1.2 targets/game" },
  { id: 41, name: "Ronan Mead", position: "WR", team: "Highland Pines Hawks", age: 27, byeWeek: 14, thisSeasonPPG: 13.2, lastSeasonPPG: 12.5, projectionPPG: 13.4, touchesPerGame: 7.0, touchShare: 17, injuryStatus: "IR", expectedWeeksOut: 6, injuredTeammates: "Slot WR returns: reduced target competition" },
  { id: 42, name: "Dylan Kessler", position: "WR", team: "Lakeshore Comets", age: 24, byeWeek: 13, thisSeasonPPG: 12.4, lastSeasonPPG: 11.3, projectionPPG: 12.7, touchesPerGame: 6.8, touchShare: 16, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 questionable: +2.8 targets/game" },
  { id: 43, name: "Andre Solis", position: "WR", team: "Maple Valley Foxes", age: 26, byeWeek: 6, thisSeasonPPG: 11.8, lastSeasonPPG: 12.0, projectionPPG: 11.6, touchesPerGame: 6.5, touchShare: 16, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Slot WR out 3 weeks: +2.3 targets/game" },
  { id: 44, name: "Finn Oster", position: "WR", team: "Mesa Verde Stallions", age: 21, byeWeek: 7, thisSeasonPPG: 11.1, lastSeasonPPG: 7.8, projectionPPG: 11.9, touchesPerGame: 6.3, touchShare: 15, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting WR out 5 weeks: +3.9 targets/game" },
  { id: 45, name: "Blaine Hayes", position: "WR", team: "Northstar Wolves", age: 28, byeWeek: 8, thisSeasonPPG: 10.5, lastSeasonPPG: 11.1, projectionPPG: 10.3, touchesPerGame: 6.1, touchShare: 15, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR2 out 1 week: +1.7 targets/game" },
  { id: 46, name: "Riley Knox", position: "WR", team: "Redwood Coast Kings", age: 25, byeWeek: 10, thisSeasonPPG: 9.8, lastSeasonPPG: 10.4, projectionPPG: 9.7, touchesPerGame: 5.9, touchShare: 14, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "TE out 2 weeks: +0.9 targets/game" },
  { id: 47, name: "Kellan Rhodes", position: "WR", team: "Silver Sands Fireflies", age: 23, byeWeek: 5, thisSeasonPPG: 9.2, lastSeasonPPG: 8.6, projectionPPG: 9.5, touchesPerGame: 5.7, touchShare: 14, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 out 3 weeks: +3.2 targets/game" },
  { id: 48, name: "Trey Sutton", position: "WR", team: "Stonebridge Voyagers", age: 29, byeWeek: 12, thisSeasonPPG: 8.6, lastSeasonPPG: 9.9, projectionPPG: 8.4, touchesPerGame: 5.5, touchShare: 13, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Backup WR promoted: no added value to this player" },
  { id: 49, name: "Devin Nash", position: "WR", team: "Arbor City Owls", age: 24, byeWeek: 7, thisSeasonPPG: 8.0, lastSeasonPPG: 7.2, projectionPPG: 8.3, touchesPerGame: 5.3, touchShare: 13, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Slot WR questionable: +1.5 targets/game" },
  { id: 50, name: "Miles Becker", position: "WR", team: "Bay Harbor Tides", age: 22, byeWeek: 9, thisSeasonPPG: 7.4, lastSeasonPPG: 5.9, projectionPPG: 7.8, touchesPerGame: 5.1, touchShare: 12, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR2 out 1 week: +1.2 targets/game" },
  { id: 51, name: "Evan Rhodes", position: "WR", team: "Copper Ridge Navigators", age: 26, byeWeek: 5, thisSeasonPPG: 6.8, lastSeasonPPG: 7.5, projectionPPG: 6.9, touchesPerGame: 4.8, touchShare: 11, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Slot receiver out 2 weeks: +1.6 targets/game" },
  { id: 52, name: "Logan Creed", position: "WR", team: "Cedar Grove Wolves", age: 23, byeWeek: 11, thisSeasonPPG: 6.1, lastSeasonPPG: 6.4, projectionPPG: 6.3, touchesPerGame: 4.6, touchShare: 11, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "No active teammate injuries" },

  // Tight ends
  { id: 53, name: "Gavin Pierce", position: "TE", team: "Desert Palm Coyotes", age: 27, byeWeek: 6, thisSeasonPPG: 12.8, lastSeasonPPG: 11.6, projectionPPG: 12.5, touchesPerGame: 6.2, touchShare: 15, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR2 out 3 weeks: +1.4 targets/game" },
  { id: 54, name: "Hugo Banks", position: "TE", team: "Eastport Anchors", age: 25, byeWeek: 12, thisSeasonPPG: 11.6, lastSeasonPPG: 9.8, projectionPPG: 11.9, touchesPerGame: 5.9, touchShare: 14, injuryStatus: "Questionable", expectedWeeksOut: 1, injuredTeammates: "Slot WR out 2 weeks: +1.8 targets/game" },
  { id: 55, name: "Silas Kent", position: "TE", team: "Frost Lake Lynx", age: 29, byeWeek: 8, thisSeasonPPG: 10.5, lastSeasonPPG: 11.2, projectionPPG: 10.2, touchesPerGame: 5.6, touchShare: 13, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 out 1 week: +1.1 targets/game" },
  { id: 56, name: "Orlando Price", position: "TE", team: "Granite Falls Meteors", age: 24, byeWeek: 10, thisSeasonPPG: 9.7, lastSeasonPPG: 7.9, projectionPPG: 10.1, touchesPerGame: 5.3, touchShare: 12, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Starting RB questionable: +0.8 targets/game" },
  { id: 57, name: "Nate Vale", position: "TE", team: "Highland Pines Hawks", age: 26, byeWeek: 14, thisSeasonPPG: 8.9, lastSeasonPPG: 9.3, projectionPPG: 8.7, touchesPerGame: 5.0, touchShare: 12, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Backup TE active: no role increase" },
  { id: 58, name: "Felix Crowe", position: "TE", team: "Lakeshore Comets", age: 23, byeWeek: 13, thisSeasonPPG: 8.1, lastSeasonPPG: 6.2, projectionPPG: 8.5, touchesPerGame: 4.7, touchShare: 11, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR1 out 2 weeks: +1.5 targets/game" },
  { id: 59, name: "Wes Rowan", position: "TE", team: "Maple Valley Foxes", age: 28, byeWeek: 6, thisSeasonPPG: 7.2, lastSeasonPPG: 8.0, projectionPPG: 7.0, touchesPerGame: 4.4, touchShare: 10, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "Second TE active: more rotation" },
  { id: 60, name: "Carter Lowe", position: "TE", team: "Mesa Verde Stallions", age: 22, byeWeek: 7, thisSeasonPPG: 6.4, lastSeasonPPG: 4.8, projectionPPG: 6.7, touchesPerGame: 4.1, touchShare: 9, injuryStatus: "Healthy", expectedWeeksOut: 0, injuredTeammates: "WR2 out 1 week: +0.7 targets/game" }
];

const EXTRA_PLAYER_FIRST_NAMES = [
  "Alistair", "Ambrose", "Ansel", "Arlo", "Asa", "August",
  "Baylor", "Beckett", "Bodhi", "Bowen", "Bram", "Callan",
  "Cormac", "Dashiell", "Declan", "Desmond", "Eamon", "Edison",
  "Elias", "Ellison", "Evander", "Finnegan", "Flynn", "Foster",
  "Gage", "Griffin", "Harlan", "Heath", "Holden", "Idris",
  "Jensen", "Kieran", "Lachlan", "Leander", "Leland", "Lucian",
  "Merrick", "Montgomery", "Niall", "Oren", "Orson", "Otis",
  "Pascal", "Quincy", "Rafferty", "Shepherd", "Stellan", "Sullivan",
  "Tate", "Thatcher", "Tiernan", "Tobias", "Vaughn", "Wallace",
  "Wells", "Whitaker", "Wilder", "Xander", "York", "Zavier"
];
const EXTRA_PLAYER_LAST_NAMES = [
  "Abernathy", "Aldridge", "Ashford", "Atwood", "Barlow", "Beckett",
  "Bexley", "Blackwell", "Bramwell", "Bridger", "Calloway", "Carrow",
  "Chadwick", "Channing", "Chatham", "Cormier", "Dempsey", "Denholm",
  "Easton", "Ellington", "Fairchild", "Fawcett", "Fenwick", "Fielding",
  "Fitzroy", "Galloway", "Halston", "Hardwick", "Huxley", "Ingram",
  "Irwin", "Jamison", "Keating", "Kincaid", "Kingsley", "Langford",
  "Latham", "Lockwood", "Marlow", "Merritt", "Norwood", "Oakley",
  "Pemberton", "Penrose", "Prescott", "Redmond", "Ridley", "Rockwell",
  "Rourke", "Sinclair", "Sterling", "Templeton", "Thornfield", "Tolland",
  "Underwood", "Waverly", "Westbrook", "Wexler", "Whitmore", "Winslow"
];

function makeExtraPlayers(position, count, firstId) {
  const projectionRanges = {
    RB: { base: 7, spread: 11 },
    WR: { base: 6, spread: 12 },
    TE: { base: 5, spread: 8 }
  };
  const range = projectionRanges[position];
  return Array.from({ length: count }, function (_, index) {
    const nameIndex = firstId - 61 + index;
    const projection = range.base + (index % 16) * range.spread / 15;
    const injuryStatus = index % 17 === 0 ? "Questionable" : "Healthy";
    return {
      id: firstId + index,
      name: EXTRA_PLAYER_FIRST_NAMES[nameIndex % EXTRA_PLAYER_FIRST_NAMES.length] + " " +
        EXTRA_PLAYER_LAST_NAMES[Math.floor(nameIndex / 2) % EXTRA_PLAYER_LAST_NAMES.length],
      position: position,
      team: TEAMS[(firstId + index) % TEAMS.length],
      age: 21 + (index % 13),
      byeWeek: 5 + (index % 10),
      thisSeasonPPG: Number((projection * 0.96).toFixed(1)),
      lastSeasonPPG: Number((projection * 0.91).toFixed(1)),
      projectionPPG: Number(projection.toFixed(1)),
      touchesPerGame: position === "RB" ? 7 + (index % 18) : 3 + (index % 8),
      touchShare: 12 + (index * 5 % 56),
      injuryStatus: injuryStatus,
      expectedWeeksOut: injuryStatus === "Healthy" ? 0 : 1,
      injuredTeammates: index % 3 === 0
        ? "A teammate is out briefly: +1.2 opportunities/game"
        : "No projected teammate role changes"
    };
  });
}

PLAYERS.push.apply(PLAYERS, makeExtraPlayers("RB", 40, 61));
PLAYERS.push.apply(PLAYERS, makeExtraPlayers("WR", 64, 101));
PLAYERS.push.apply(PLAYERS, makeExtraPlayers("TE", 16, 165));

const BACKUP_QUARTERBACKS = [
  ["Arlo Bennett", "Arbor City Owls", 14.8, 13.9, 14.4],
  ["Baylor Keating", "Bay Harbor Tides", 14.2, 13.1, 13.8],
  ["Callan Wexler", "Copper Ridge Navigators", 13.7, 12.6, 13.4],
  ["Declan Ridley", "Cedar Grove Wolves", 13.1, 12.2, 12.9],
  ["Ellis Marlow", "Desert Palm Coyotes", 12.7, 11.8, 12.5],
  ["Tobin Merritt", "Eastport Anchors", 12.1, 11.4, 12.0],
  ["Gage Sinclair", "Frost Lake Lynx", 11.8, 10.9, 11.6],
  ["Heath Langford", "Granite Falls Meteors", 11.2, 10.5, 11.0],
  ["Idris Carrow", "Highland Pines Hawks", 10.8, 10.1, 10.7],
  ["Kieran Westbrook", "Lakeshore Comets", 10.2, 9.6, 10.1],
  ["Lachlan Prescott", "Maple Valley Foxes", 9.4, 8.8, 9.5],
  ["Merrick Thornfield", "Mesa Verde Stallions", 8.6, 8.2, 8.8]
];
PLAYERS.push.apply(PLAYERS, BACKUP_QUARTERBACKS.map(function (quarterback, index) {
  return {
    id: 181 + index,
    name: quarterback[0],
    position: "QB",
    team: quarterback[1],
    age: 22 + index % 9,
    byeWeek: 5 + index % 10,
    thisSeasonPPG: quarterback[2],
    lastSeasonPPG: quarterback[3],
    projectionPPG: quarterback[4],
    touchesPerGame: Number((15.2 + index % 7 * 0.8).toFixed(1)),
    touchShare: 35 + index % 7 * 2,
    injuryStatus: "Healthy",
    expectedWeeksOut: 0,
    injuredTeammates: "No teammate impact"
  };
}));

const KICKER_STATS = [
  [7.8, 7.4, 8.0], [8.2, 7.9, 8.3], [7.1, 7.6, 7.5], [8.6, 8.1, 8.4],
  [7.5, 7.2, 7.8], [9.1, 8.6, 8.9], [6.8, 7.0, 7.2], [8.0, 7.7, 8.1],
  [7.4, 7.9, 7.7], [8.8, 8.3, 8.6], [7.2, 6.9, 7.5], [8.4, 8.0, 8.2],
  [7.7, 7.3, 7.9], [9.3, 8.8, 9.0], [6.9, 7.1, 7.4], [8.1, 7.8, 8.3]
];
const KICKER_NAMES = [
  "Brennan Pike", "Cody Rusk", "Dylan March", "Elliot Crane",
  "Garrett Voss", "Harvey Sloan", "Jamie Lark", "Keaton Wells",
  "Landon Reese", "Mason Redd", "Nolan Fitch", "Owen Stroud",
  "Perry Locke", "Quincy Hart", "Rory Beck", "Sawyer Kent"
];
const DEFENSE_STATS = [
  [7.4, 7.1, 7.8], [6.8, 7.4, 7.2], [8.2, 7.8, 8.1], [6.2, 6.7, 6.8],
  [7.1, 6.8, 7.3], [8.9, 8.4, 8.7], [5.8, 6.2, 6.4], [7.8, 7.5, 8.0],
  [6.6, 7.0, 7.1], [9.2, 8.7, 9.0], [6.1, 6.4, 6.7], [8.4, 8.0, 8.3],
  [7.3, 6.9, 7.5], [9.6, 9.1, 9.3], [5.9, 6.3, 6.5], [7.6, 7.2, 7.9]
];

TEAMS.forEach(function (team, index) {
  const kickerStats = KICKER_STATS[index];
  const kickerStatus = index === 6 || index === 13 ? "Questionable" : "Healthy";
  PLAYERS.push({
    id: 193 + index,
    name: KICKER_NAMES[index],
    position: "K",
    team: team,
    age: 23 + index % 15,
    byeWeek: 5 + index % 10,
    thisSeasonPPG: kickerStats[0],
    lastSeasonPPG: kickerStats[1],
    projectionPPG: kickerStats[2],
    touchesPerGame: 0,
    touchShare: 0,
    injuryStatus: kickerStatus,
    expectedWeeksOut: 0,
    injuredTeammates: "No teammate impact"
  });
  const defenseStats = DEFENSE_STATS[index];
  PLAYERS.push({
    id: 209 + index,
    name: team + " D/ST",
    position: "DEF",
    team: team,
    age: 0,
    byeWeek: 5 + index % 10,
    thisSeasonPPG: defenseStats[0],
    lastSeasonPPG: defenseStats[1],
    projectionPPG: defenseStats[2],
    touchesPerGame: 0,
    touchShare: 0,
    injuryStatus: "Healthy",
    expectedWeeksOut: 0,
    injuredTeammates: "No teammate impact"
  });
});

const FANTASY_TEAM_NAMES = [
  "Fourth and Long",
  "Waiver Wire Warriors",
  "End Zone Architects",
  "The Bye Week Bandits",
  "Sunday Scaries",
  "Bench Mob",
  "Red Zone Raccoons",
  "Pigskin Pioneers",
  "Huddle and Flow",
  "Touchdown Tacticians",
  "The Audible Alliance",
  "Goal Line Gardeners"
];

const DRAFT_ROUNDS = [
  "QB", "WR", "RB", "TE", "WR", "QB", "RB", "WR",
  "DEF", "RB", "WR", "K", "TE"
];

const draftTeams = FANTASY_TEAM_NAMES.map(function (_, teamIndex) {
  return { id: "team-" + (teamIndex + 1), roster: [] };
});

const draftPools = ["QB", "RB", "WR", "TE", "K", "DEF"].reduce(function (pools, position) {
  pools[position] = PLAYERS.filter(function (player) {
    return player.position === position;
  }).sort(function (a, b) {
    return b.projectionPPG - a.projectionPPG;
  });
  return pools;
}, {});
const draftedByPosition = { QB: 0, RB: 0, WR: 0, TE: 0, K: 0, DEF: 0 };

DRAFT_ROUNDS.forEach(function (position, roundIndex) {
  for (let pick = 0; pick < draftTeams.length; pick++) {
    const teamIndex = roundIndex % 2 === 0 ? pick : draftTeams.length - 1 - pick;
    const player = draftPools[position][draftedByPosition[position]++];
    draftTeams[teamIndex].roster.push(player.id);
  }
});

function exchangeDraftPicks(position, firstRank, secondRank) {
  const firstPlayerId = draftPools[position][firstRank - 1].id;
  const secondPlayerId = draftPools[position][secondRank - 1].id;
  const firstTeam = draftTeams.find(function (team) {
    return team.roster.indexOf(firstPlayerId) !== -1;
  });
  const secondTeam = draftTeams.find(function (team) {
    return team.roster.indexOf(secondPlayerId) !== -1;
  });
  const firstPlayerIndex = firstTeam.roster.indexOf(firstPlayerId);
  const secondPlayerIndex = secondTeam.roster.indexOf(secondPlayerId);
  firstTeam.roster[firstPlayerIndex] = secondPlayerId;
  secondTeam.roster[secondPlayerIndex] = firstPlayerId;
}

// Give the demo manager position-specific draft priorities while retaining a balanced snake draft.
exchangeDraftPicks("RB", 1, 24);
exchangeDraftPicks("WR", 13, 8);
exchangeDraftPicks("WR", 1, 8);
exchangeDraftPicks("TE", 12, 8);
exchangeDraftPicks("DEF", 1, 8);

const DEMO_LEAGUE = {
  leagueId: "DEMO-281",
  myTeamId: "team-1",
  teams: draftTeams.map(function (team, teamIndex) {
    return {
      id: team.id,
      name: FANTASY_TEAM_NAMES[teamIndex],
      managerName: teamIndex === 0
        ? "You"
        : ["Avery", "Jordan", "Morgan", "Riley", "Casey", "Quinn", "Emery", "Reese", "Skyler", "Tatum", "Parker"][teamIndex - 1],
      record: ["7-3", "6-4", "6-4", "5-5", "5-5", "4-6", "7-3", "3-7", "6-4", "4-6", "5-5", "3-7"][teamIndex],
      tradeStyle: ["Active", "Picky", "Rarely trades", "Active", "Picky", "Rarely trades", "Picky", "Active", "Rarely trades", "Active", "Picky", "Rarely trades"][teamIndex],
      roster: team.roster
    };
  })
};

const COMMUNITY_TRADE_VALUES = [
  { playerId: 13, value: 98, weeklyChange: 4, tradesLogged: 612 },
  { playerId: 33, value: 95, weeklyChange: 2, weeklyDirection: "down", tradesLogged: 587 },
  { playerId: 14, value: 91, weeklyChange: 3, tradesLogged: 541 },
  { playerId: 34, value: 90, weeklyChange: 1, tradesLogged: 530 },
  { playerId: 15, value: 86, weeklyChange: 1, weeklyDirection: "down", tradesLogged: 498 },
  { playerId: 116, value: 83, weeklyChange: 5, tradesLogged: 476 },
  { playerId: 16, value: 81, weeklyChange: 3, weeklyDirection: "down", tradesLogged: 451 },
  { playerId: 132, value: 79, weeklyChange: 2, tradesLogged: 427 },
  { playerId: 76, value: 76, weeklyChange: 2, weeklyDirection: "down", tradesLogged: 398 },
  { playerId: 148, value: 74, weeklyChange: 1, tradesLogged: 376 },
  { playerId: 92, value: 72, weeklyChange: 4, weeklyDirection: "down", tradesLogged: 352 },
  { playerId: 35, value: 69, weeklyChange: 3, tradesLogged: 331 },
  { playerId: 75, value: 67, weeklyChange: 1, weeklyDirection: "down", tradesLogged: 308 },
  { playerId: 1, value: 65, weeklyChange: 2, tradesLogged: 286 },
  { playerId: 180, value: 62, weeklyChange: 2, weeklyDirection: "down", tradesLogged: 263 }
];
