const { getPredictions } = require("./data/api-predictions.js");
const { getHKMatches } = require("./getAPIFixtureId.js");
const { getLogo } = require("./data/api-logo.js");

async function handleResult(id) {
  const winRate = await getPredictions(id);
// <<<<<<< HEAD
//   console.log(winRate);
//   const matches = await getHKMatches();
//   console.log(matches);
//   let homeOdd = 2;
//   let awayOdd = 2;
//   const hkTeam = matches.find((match) => match.frontEndId === id);
// =======
  const teamLogo = await getLogo(id);
// >>>>>>> e2b24ba9c06f22560001471dc2cd650cf0ac360a
//
  const matches = await getHKMatches();
  const hkTeam = matches.find((match) => match.frontEndId === id);
  let homeOdd;
  let awayOdd;
  if(winRate.homeOdds) {
    homeOdd = winRate.homeOdds;
    awayOdd = winRate.awayOdds;
  } else {
    if (hkTeam && hkTeam.foPools && hkTeam.foPools[0]) {
      const combinations = hkTeam.foPools[0].lines[0]?.combinations || [];
      if (combinations[0]) {
        homeOdd = combinations[0].currentOdds || homeOdd;
        awayOdd = combinations[1]?.currentOdds || awayOdd; // If combinations[1] exists
      }
    }
  }
  homeTeamName = hkTeam.homeTeam.name_ch;
  awayTeamName = hkTeam.awayTeam.name_ch;
  
  const homeWinProb = parseFloat((100 / homeOdd).toFixed(1));
  const awayWinProb = parseFloat((100 / awayOdd).toFixed(1));

  const homeWinRate = homeWinProb * 100 / (homeWinProb + awayWinProb);
  const awayWinRate = awayWinProb * 100 / (homeWinProb + awayWinProb);

  const overRound = parseFloat((homeWinProb + awayWinProb - 100).toFixed(1));

  const bet_funds = 100;
  const evHome = parseFloat(
    ((homeWinProb / 100) * homeOdd * bet_funds - (awayWinProb / 100) * bet_funds).toFixed(2),
  );
  const evAway = parseFloat(
    ((awayWinProb / 100) * awayOdd * bet_funds - (homeWinProb / 100) * bet_funds).toFixed(2),
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

  const homeTeamLogo = teamLogo.homeLogo ? teamLogo.homeLogo : "";
  const awayTeamLogo = teamLogo.awayLogo ? teamLogo.awayLogo : "";

  const matchResult = {
    homeTeamName,
    homeTeamLogo,
    awayTeamName,
    awayTeamLogo,
    homeWinRate: parseFloat(homeWinRate),
    awayWinRate: parseFloat(awayWinRate),
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

// handleResult("FB6264");
module.exports = { handleResult };
