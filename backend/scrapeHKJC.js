const axios = require('axios');

async function getFootballData() {
  const response = await axios.get('https://api.football-data.org/v4/matches', {
    headers: {
      'X-Auth-Token': 'd7164ddc65b246d0a020e857397f34f2'
    }
  });

  const matches = response.data.matches;
  console.log("matchs", matches.length);
//   matches.forEach(match => {
//     console.log('Home Team:', match.homeTeam.name);
//     console.log('Away Team:', match.awayTeam.name);
//     console.log('Score:', match.score.fullTime.homeTeam, 'vs', match.score.fullTime.awayTeam);
//   });
}

getFootballData();
