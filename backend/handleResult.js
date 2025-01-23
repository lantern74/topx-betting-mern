const { getPredictions } = require("./data/api-predictions.js");
const { getHKMatches } = require("./getAPIFixtureId.js");

async function handleResult(id) {
  const winRate = await getPredictions(id);
  console.log(winRate);
  const matches = await getHKMatches();
  console.log(matches);
  let homeOdd = 2;
  let awayOdd = 2;
  const hkTeam = matches.find((match) => match.frontEndId === id);

  homeTeamName = hkTeam.homeTeam.name_ch;
  awayTeamName = hkTeam.awayTeam.name_ch;
  if (hkTeam && hkTeam.foPools && hkTeam.foPools[0]) {
    const combinations = hkTeam.foPools[0].lines[0]?.combinations || [];
    if (combinations[0]) {
      homeOdd = combinations[0].currentOdds || homeOdd;
      awayOdd = combinations[1]?.currentOdds || awayOdd; // If combinations[1] exists
    }
  }
  let homePercent;
  let awayPercent;
  if (winRate.homeWinPercent != "") {
    homePercent = winRate.homeWinPercent;
    awayPercent = winRate.awayWinPercent;
  } else {
    homePercent = "33%";
    awayPercent = "33%";
  }
  let homeValueRate = (100 / homeOdd * 3 + parseInt(homePercent, 10) * 7) / 10;
  let awayValueRate = (100 / awayOdd * 3 + parseInt(awayPercent, 10) * 7) / 10;

  const [homeWinRate, awayWinRate] = scalePercentages(
    homeValueRate,
    awayValueRate,
  );

  const homeWinProb = parseFloat((100 / homeOdd).toFixed(1));
  const awayWinProb = parseFloat((100 / awayOdd).toFixed(1));

  const overRound = parseFloat((homeWinProb + awayWinProb).toFixed(1));

  const evHome = parseFloat(
    (homeWinProb * (homeOdd - 1) - (1 - homeWinProb) * 1).toFixed(2),
  );
  const evAway = parseFloat(
    (awayWinProb * (awayOdd - 1) - (1 - awayWinProb) * 1).toFixed(2),
  );

  const pbrHome = parseFloat((homeOdd / homeWinProb).toFixed(2));
  const pbrAway = parseFloat((awayOdd / awayWinProb).toFixed(2));

  const kellyHome = parseFloat(
    ((homeWinProb * (homeOdd - 1) - (1 - homeWinProb)) / (homeOdd - 1)).toFixed(
      2,
    ),
  );
  const kellyAway = parseFloat(
    ((awayWinProb * (awayOdd - 1) - (1 - awayWinProb)) / (awayOdd - 1)).toFixed(
      2,
    ),
  );

  const homeTeamLogo = winRate.homeTeamLogo ? winRate.homeTeamLogo : "";
  const awayTeamLogo = winRate.awayTeamLogo ? winRate.awayTeamLogo : "";

  const matchResult = {
    homeTeamName,
    homeTeamLogo,
    awayTeamName,
    awayTeamLogo,
    homeWinRate,
    awayWinRate,
    overRound,
    evHome,
    evAway,
    pbrHome,
    pbrAway,
    kellyHome,
    kellyAway,
  };
  console.log(matchResult);
  return matchResult;
}
function scalePercentages(home, away) {
  let isHomeHigher = home > away; // Determine if home is the higher value

  // Ensure "higher" is always the larger value for scaling
  let higher = Math.max(home, away);
  let lower = Math.min(home, away);

  // Define the target ranges
  const highMin = 75;
  const highMax = 95;
  const lowMin = 5;
  const lowMax = 25;

  // Scale the higher value to the target range
  const rangeHigh = highMax - highMin;
  const rangeLow = lowMax - lowMin;

  // Normalize higher and lower to sum to 100 before scaling
  const total = higher + lower;
  const normalizedHigher = (higher / total) * 100;
  const normalizedLower = (lower / total) * 100;

  // Apply scaling
  const scaledHigher = highMin + ((normalizedHigher - 50) / 50) * rangeHigh;
  const scaledLower = lowMax - ((50 - normalizedLower) / 50) * rangeLow;

  // Assign scaled values back to the appropriate variables
  if (isHomeHigher) {
    return [scaledHigher.toFixed(1), scaledLower.toFixed(1)];
  } else {
    return [scaledLower.toFixed(1), scaledHigher.toFixed(1)];
  }
}

// handleResult("FB5263")
module.exports = { handleResult };
