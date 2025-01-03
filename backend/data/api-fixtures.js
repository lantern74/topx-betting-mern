const axios = require('axios');
const { Match } = require('../models/match.model');

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

// Function to fetch data from the API
const fetchDataFromAPI = async (date) => {
    const options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/fixtures',
        params: { date },
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
        }
    };

    try {
        const response = await axios(options);
        return response.data.response.map(match => ({
            id: match.fixture.id,
            team: `${match.teams.home.name} vs ${match.teams.away.name}`,
        }));
    } catch (error) {
        console.error(`Error fetching data for date: ${date}`, error.message);
        return [];
    }
};

// Main function to fetch or retrieve cached data
const fetchAllData = async () => {
    const cacheKey = 'allFixtures';
    const cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds

    // Check if cached data exists and is still valid
    const cachedMatch = await Match.findOne({ cacheKey: cacheKey });

    if (cachedMatch && cachedMatch.lastUpdated && (Date.now() - cachedMatch.lastUpdated) < cacheDuration) {
        console.log('Returning cached fixture data');
        return cachedMatch.data;
    }

    // If no valid cache, fetch new data
    const allFixtures = [];
    for (const date of dates) {
        const fixtures = await fetchDataFromAPI(date);
        allFixtures.push(...fixtures);
    }

    // Save new data to cache
    const newCache = {
        cacheKey: cacheKey,
        data: allFixtures,
        lastUpdated: Date.now(),
    };

    if (cachedMatch) {
        await Match.updateOne({ cacheKey: cacheKey }, { $set: newCache });
    } else {
        const newMatch = new Match(newCache);
        await newMatch.save();
    }

    console.log('Updated fixture data cache');
    return allFixtures;
};

module.exports = { fetchAllData };
