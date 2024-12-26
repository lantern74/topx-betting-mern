const request = require("request");
const { processTeams } = require("../getAPITeamId");

async function getFixtureID() {
    try {
        // Get matched teams from processTeams
        const matchedTeams = await processTeams();
        const fixtureIDs = []; // To store fixture IDs

        // Example: Using matched teams to construct head-to-head queries
        for (const match of matchedTeams) {
            const h2h = `${match.apiHomeTeamId}-${match.apiAwayTeamId}`;

            const options = {
                method: 'GET',
                url: 'https://v3.football.api-sports.io/fixtures/headtohead',
                qs: { h2h: h2h },
                headers: {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
                }
            };

            await new Promise((resolve, reject) => {
                request(options, function (error, response, body) {
                    if (error) return reject(error);

                    const data = JSON.parse(body);

                    if (data.response && data.response.length > 0) {
                        // Assuming the first fixture ID in the response is desired
                        const fixtureID = data.response[0].fixture.id;
                        fixtureIDs.push(fixtureID);
                    } else {
                      fixtureIDs.push("NULL");
                    }
                    resolve();
                });
            });
        }

        // Return collected fixture IDs
        return fixtureIDs;
    } catch (error) {
        console.error("Error in head-to-head processing:", error.message);
        throw error; // Propagate the error
    }
}

// Export the function
module.exports = { getFixtureID };
