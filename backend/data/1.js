const axios = require("axios");

// Variable to store all IDs and teams
const fixtures = [];

// Function to fetch data for each date
const fetchData = async () => {
  const options = {
    method: "GET",
    url: `https://v3.football.api-sports.io/fixtures?date=2025-01-21`,
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "43984110ca9979e5fbc3d812d6808265",
    },
  };

  try {
    const response = await axios(options);
    const data = response.data;

    // Collect IDs and teams
    data.response.forEach((match) => {
      fixtures.push({
        id: match.fixture.id,
        team: `${match.teams.home.name} vs ${match.teams.away.name}`,
      });
      
    });
    fixtures.forEach(fixture => console.log(fixture));
  } catch (error) {
    // console.error(`Error fetching data for date: ${date}`, error.message);
  }
};

fetchData();
