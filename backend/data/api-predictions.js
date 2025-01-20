// const axios = require("axios");
// const { processTeams } = require("../getAPIFixtureId"); // Adjust the path as needed

// async function getPredictions(id) {
//   try {
//     // Get the matched team from processTeams
//     const matchedTeam = await processTeams(id);

//     if (matchedTeam.fixtureId === "Null") {
//       // Handle 'NULL' matchedTeam with default values
//       return {
//         id: matchedTeam.id,
//         homeWinPercent: "1%",
//         awayWinPercent: "1%",
//       };
//     }

//     const options = {
//       method: "GET",
//       url: "https://v3.football.api-sports.io/predictions",
//       params: { fixture: matchedTeam.fixtureId },
//       headers: {
//         "x-rapidapi-host": "v3.football.api-sports.io",
//         "x-rapidapi-key": "43984110ca9979e5fbc3d812d6808265",
//       },
//     };

//     try {
//       const response = await axios.request(options);
//       const data = response.data;

//       if (data.response && data.response[0]) {
//         const homeWinPercent = data.response[0].predictions.percent.home;
//         const awayWinPercent = data.response[0].predictions.percent.away;
//         const homeTeamLogo = data.response[0].teams.home.logo;
//         const awayTeamLogo = data.response[0].teams.away.logo;
//         return {
//           id: matchedTeam.id,
//           homeTeamLogo: homeTeamLogo,
//           awayTeamLogo: awayTeamLogo,
//           homeWinPercent,
//           awayWinPercent,
//         };
//       } else {
//         console.log(
//           "No predictions data found for fixture:",
//           matchedTeam.fixtureId,
//         );
//         return {
//           id: matchedTeam.id,
//           homeWinPercent: "N/A",
//           awayWinPercent: "N/A",
//         };
//       }
//     } catch (error) {
//       console.error(
//         `Error fetching prediction for fixture ${matchedTeam.fixtureId}:`,
//         error.message,
//       );
//       return {
//         id: matchedTeam.id,
//         homeWinPercent: "Error%",
//         awayWinPercent: "Error%",
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching predictions:", error.message);
//     return {
//       id: "Error",
//       homeWinPercent: "Error%",
//       awayWinPercent: "Error%",
//     };
//   }
// }
// // Export the getPredictions function
// module.exports = { getPredictions };


const axios = require("axios");
const { processTeams } = require("../getAPIFixtureId"); // Adjust the path as needed
async function getPredictions(id) {
  try {
    const matchedTeam = await processTeams(id);
    console.log(matchedTeam)
    const options = {
      method: "GET",
      url: "https://v3.football.api-sports.io/odds", // Corrected URL
      params: { fixture: matchedTeam.fixtureId }, // Use params to pass query parameters
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "43984110ca9979e5fbc3d812d6808265",
      },
    };

    const response = await axios.request(options);
    const data = response.data;

    // Check if response data exists and log it
    if (data.response) {
      const bet365Bookmarker = data.response[0].bookmakers.find(bookmaker => bookmaker.id === 8);
      const odds = bet365Bookmarker.bets.find(bet => bet.name === "Home/Away");
      // console.log(bet365Bookmarker);
      return {
        homeOdds: odds.values.find(value => value.value === "Home").odd,
        awayOdds: odds.values.find(value => value.value === "Away").odd
      }
    } else {
      console.log("No predictions found.");
    }
  } catch (error) {
    console.error("Error fetching predictions:", error.message);
  }
}

getPredictions("FB6264");
module.exports = { getPredictions };

