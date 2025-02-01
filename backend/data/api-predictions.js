const axios = require("axios");
const { processTeams } = require("../getAPIFixtureId"); // Adjust the path as needed
async function getPredictions(id) {
  try {
    const matchedTeam = await processTeams(id);
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
      return {
        homeOdds: odds.values.find(value => value.value === "Home").odd,
        awayOdds: odds.values.find(value => value.value === "Away").odd
      }
    } else {
      console.log("No predictions found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching predictions:", error.message);
  }
}
module.exports = { getPredictions };

