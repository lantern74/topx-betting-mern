var request = require("request");
var fs = require("fs");
var { getCountries } = require('./api-countries');

// Function to get teams for a given country
function getTeamsByCountry(countryName) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: 'https://v3.football.api-sports.io/teams',
      qs: { country: countryName },
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
      }
    };

    request(options, function (error, response, body) {
      if (error) return reject(error);

      try {
        var data = JSON.parse(body);
        var teams = data.response.map(team => ({
          country: countryName,
          id: team.team.id,
          name: team.team.name,
        }));
        resolve(teams);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

// Main function to fetch countries and save all teams to CSV
async function saveAllTeamsToCSV() {
  try {
    // Fetch all countries
    const countries = await new Promise((resolve, reject) =>
      getCountries((result) => resolve(result), reject)
    );

    // Open a writable stream for the CSV file
    const writeStream = fs.createWriteStream("api_teams.csv");
    writeStream.write("Country,TeamID,TeamName\n"); // CSV Header

    // Process all countries sequentially to avoid overwhelming the API
    for (const country of countries) {
      console.log(`Fetching teams for country: ${country.name}`);
      try {
        const teams = await getTeamsByCountry(country.name);

        // Write teams to the CSV file
        teams.forEach(team => {
          writeStream.write(`${team.country},${team.id},${team.name}\n`);
        });
      } catch (error) {
        console.error(`Error fetching teams for ${country.name}:`, error);
      }
    }

    // Close the writable stream
    writeStream.end(() => {
      console.log("All teams saved to CSV successfully!");
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the function
saveAllTeamsToCSV();


// var request = require("request");

// var options = {
//   method: 'GET',
//   url: 'https://v3.football.api-sports.io/teams',
//   qs: {name: 'Bilbao'},
//   headers: {
//     'x-rapidapi-host': 'v3.football.api-sports.io',
//     'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);
//   var data = JSON.parse(body);
//       console.log(data.response);
// });

