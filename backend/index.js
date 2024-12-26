const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { getHKMatches } = require('./getAPIFixtureId.js');
const {handleResult} = require('./handleResult.js')

const app = express();
const port = 5000;

// Use CORS to allow requests from your frontend
app.use(cors());
app.use(express.json()); // To parse JSON bodies

let matchDatas = []; // Cached match data

// Function to fetch and cache match data
async function getHKMatchs() {
    try {
        const matches = await getHKMatches();
        matchDatas = matches.map((match) => ({
            time: match.kickOffTime,
            id: match.frontEndId,
            homeTeamName: match.homeTeam.name_ch,
            awayTeamName: match.awayTeam.name_ch,
        }));
    } catch (error) {
        console.error('Error occurred while fetching matches:', error.message);
    }
    
}

// Endpoint to serve match data
app.get('/match-data', async (req, res) => {
    try {
        if (matchDatas.length === 0) {
            // Fetch data if not already cached
            await getHKMatchs();
        }
        res.json(matchDatas); // Send cached match data
    } catch (error) {
        console.error('Error fetching match data:', error.message);
        res.status(500).json({ error: 'Error fetching match data' });
    }
});

// Endpoint to serve match results based on ID
app.get('/match-result/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the `id` from the request parameters
        const resultData = await handleResult(id);
        console.log(resultData, 'resultData') // Fetch match result based on `id`
        res.json(resultData); // Send the result data as JSON
    } catch (error) {
        console.error(`Error fetching match result for ID ${id}:`, error.message);
        res.status(500).json({ error: 'Error fetching match result' });
    }
});

// Start the server
app.listen(port, async () => {
    console.log(`Server running on port:${port}`);
    // Pre-fetch match data on server startup
    await getHKMatchs();
});
