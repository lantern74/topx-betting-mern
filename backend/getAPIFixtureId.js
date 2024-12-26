const fs = require('fs');
const Fuse = require('fuse.js');
const axios = require('axios');
const {fetchAllData} = require('./data/api-fixtures')

// Function to get scraped HK team names
async function getHKMatches() {
    const url = 'https://info.cld.hkjc.com/graphql/base/';
    const data = {
        "query": "\n      query matchList($startIndex: Int, $endIndex: Int,$startDate: String, $endDate: String, $matchIds: [String], $tournIds: [String], $fbOddsTypes: [FBOddsType]!, $fbOddsTypesM: [FBOddsType]!, $inplayOnly: Boolean, $featuredMatchesOnly: Boolean, $frontEndIds: [String], $earlySettlementOnly: Boolean, $showAllMatch: Boolean) {\n        matches(startIndex: $startIndex,endIndex: $endIndex, startDate: $startDate, endDate: $endDate, matchIds: $matchIds, tournIds: $tournIds, fbOddsTypes: $fbOddsTypesM, inplayOnly: $inplayOnly, featuredMatchesOnly: $featuredMatchesOnly, frontEndIds: $frontEndIds, earlySettlementOnly: $earlySettlementOnly, showAllMatch: $showAllMatch) {\n          id\n          frontEndId\n          matchDate\n          kickOffTime\n          status\n          updateAt\n          sequence\n          esIndicatorEnabled\n          homeTeam {\n            id\n            name_en\n            name_ch\n          }\n          awayTeam {\n            id\n            name_en\n            name_ch\n          }\n          tournament {\n            id\n            frontEndId\n            nameProfileId\n            isInteractiveServiceAvailable\n            code\n            name_en\n            name_ch\n          }\n          isInteractiveServiceAvailable\n          inplayDelay\n          venue {\n            code\n            name_en\n            name_ch\n          }\n          tvChannels {\n            code\n            name_en\n            name_ch\n          }\n          liveEvents {\n            id\n            code\n          }\n          featureStartTime\n          featureMatchSequence\n          poolInfo {\n            normalPools\n            inplayPools\n            sellingPools\n            ntsInfo\n            entInfo\n            definedPools\n          }\n          runningResult {\n            homeScore\n            awayScore\n            corner\n            homeCorner\n            awayCorner\n          }\n          runningResultExtra {\n            homeScore\n            awayScore\n            corner\n            homeCorner\n            awayCorner\n          }\n          adminOperation {\n            remark {\n              typ\n            }\n          }\n          foPools(fbOddsTypes: $fbOddsTypes) {\n            id\n            status\n            oddsType\n            instNo\n            inplay\n            name_ch\n            name_en\n            updateAt\n            expectedSuspendDateTime\n            lines {\n              lineId\n              status\n              condition\n              main\n              combinations {\n                combId\n                str\n                status\n                offerEarlySettlement\n                currentOdds\n                selections {\n                  selId\n                  str\n                  name_ch\n                  name_en\n                }\n              }\n            }\n          }\n        }\n      }\n      ",
    "variables": {
        "fbOddsTypes": [
            "HDC",
            "EDC"
        ],
        "fbOddsTypesM": [
            "HDC",
            "EDC"
        ],
        "featuredMatchesOnly": false,
        "startDate": null,
        "endDate": null,
        "tournIds": null,
        "matchIds": null,
        "tournId": null,
        "tournProfileId": null,
        "subType": null,
        "startIndex": 1,
        "endIndex": 120,
        "frontEndIds": null,
        "earlySettlementOnly": false,
        "showAllMatch": false,
        "tday": null,
        "tIdList": null
    }
    };

    try {
        const response = await axios.post(url, data);
        const matches = response.data.data.matches;
        return matches;
    } catch (error) {
        console.error('Error fetching HK teams:', error.message);
        return [];
    }
}

// Match teams using Fuse.js
function matchTeams(apiTeams, hkTeam) {
    const fuse = new Fuse(apiTeams, { keys: ['team'], threshold: 0.4 });
    let matchedTeam;

    const result = fuse.search(hkTeam[0].team);
    if (result && result.length > 0) {
        const item = result[0].item;  // Get the first match from the search result
        matchedTeam = {
            id: hkTeam[0].id,
            fixtureId: item.id,
            fixtureTeam: item.team,
        };
    } else {
        matchedTeam = {
            id: hkTeam[0].id,
            fixtureId: "Null",
            fixtureTeam: "Null",
        };
    }
    return matchedTeam;
}

// Main function to process and match teams
async function processTeams(id) {
    try {
        // Load API teams from CSV
        const apiTeams = await fetchAllData();

        // Scrape HK team names
        const hkMatches = await getHKMatches();
        const hkTeam = hkMatches
            .filter(match => match.frontEndId === id) // Filter matches by `id`
            .map(match => ({
                id: id,
                team: `${match.homeTeam.name_en} vs ${match.awayTeam.name_en}`,
        }));

        // Match HK teams with API teams
        const matchedTeam = matchTeams(apiTeams, hkTeam);

        return matchedTeam;
    } catch (error) {
        console.error('Error processing teams:', error.message);
    }
}

module.exports = { processTeams, getHKMatches };

