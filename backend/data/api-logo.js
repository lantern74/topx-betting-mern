
const axios = require("axios");
const { processTeams } = require("../getAPIFixtureId"); // Adjust the path as needed
async function getLogo(id) {
  try {
    const matchedTeam = await processTeams(id);
    const options = {
      method: "GET",
      url: "https://v3.football.api-sports.io/predictions", // Corrected URL
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
      const homeTeamLogo = data.response[0].teams?.home?.logo;
      const awayTeamLogo = data.response[0].teams?.away?.logo;
      return {
        homeLogo: homeTeamLogo,
        awayLogo: awayTeamLogo,
      }
    } else {
      console.log("No predictions found.");
    }
  } catch (error) {
    console.error("Error fetching predictions:", error.message);
  }
}

module.exports = { getLogo };

