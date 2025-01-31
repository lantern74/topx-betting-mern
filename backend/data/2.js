const axios = require("axios");
async function getPredictions() {
  try {
    const options = {
      method: "GET",
      url: "https://v3.football.api-sports.io/odds", // Corrected URL
      params: { fixture: "1223798" }, // Use params to pass query parameters
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "43984110ca9979e5fbc3d812d6808265",
      },
    };

    const response = await axios.request(options);
    const data = response.data;

    // Check if response data exists and log it
    if (data.response) {
      console.log(data.response[0].bookmakers[3].bets[1]);
    } else {
      console.log("No predictions found.");
    }
  } catch (error) {
    console.error("Error fetching predictions:", error.message);
  }
}

getPredictions();
