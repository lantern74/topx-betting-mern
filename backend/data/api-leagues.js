var request = require("request");
var fs = require("fs");
var path = require("path");
const { parse } = require("json2csv"); // Import json2csv library

var options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/leagues',
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
  var data = JSON.parse(body);
  
  // Check if data.response exists
  if (data.response) {
    // Convert JSON to CSV
    const csv = parse(data.response);

    // Define the path where you want to save the CSV file
    const filePath = path.join(__dirname, 'leagues.csv');

    // Write CSV to file
    fs.writeFile(filePath, csv, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('CSV file saved successfully at', filePath);
      }
    });
  } else {
    console.log('No data found in response.');
  }
});
