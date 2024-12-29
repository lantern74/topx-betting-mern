const { getHKMatches } = require('../getAPIFixtureId.js');
const { handleResult } = require('../handleResult.js');

// Function to fetch and cache match data
async function getMatchData(req, res) {
    try {
        const matches = await getHKMatches();
        const matchDatas = matches.map((match) => ({
            time: match.kickOffTime,
            id: match.frontEndId,
            homeTeamName: match.homeTeam.name_ch,
            awayTeamName: match.awayTeam.name_ch,
        }));
        res.json(matchDatas); // Send cached match data
    } catch (error) {
        console.error('Error fetching match data:', error.message);
        res.status(500).json({ error: 'Error fetching match data' });
    }
}

// Endpoint to serve match results based on ID
async function getMatchResult(req, res) {
    try {
        const { id } = req.params; // Extract the `id` from the request parameters
        const resultData = await handleResult(id);
        console.log(resultData, 'resultData') // Fetch match result based on `id`
        res.json(resultData); // Send the result data as JSON
    } catch (error) {
        console.error(`Error fetching match result for ID ${id}:`, error.message);
        res.status(500).json({ error: 'Error fetching match result' });
    }
}

module.exports = { getMatchData, getMatchResult };
