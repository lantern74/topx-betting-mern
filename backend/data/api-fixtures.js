const axios = require('axios');

// Function to format a date as 'YYYY-MM-DD'
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Function to generate an array of dates starting from today
const getDates = (days) => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i); // Increment date by `i` days
    dates.push(formatDate(date));
  }

  return dates;
};

// Array of dates (from today to 5 days ahead)
const dates = getDates(5);

// Variable to store all IDs and teams
const fixtures = [];

// Function to fetch data for each date
const fetchData = async (date) => {
  const options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/fixtures',
    params: { date }, // Pass the date dynamically
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
    }
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
  } catch (error) {
    console.error(`Error fetching data for date: ${date}`, error.message);
  }
};

// Main function to fetch data for all dates
const fetchAllData = async () => {
  for (const date of dates) {
    await fetchData(date); // Fetch data for each date
  }
  // console.log("All fixtures collected:", fixtures); // Log all collected data
  return fixtures;
};

module.exports = {fetchAllData};
