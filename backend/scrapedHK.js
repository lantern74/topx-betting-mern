const axios = require('axios');

// Function to send a POST request
async function postData() {
    const url = 'https://info.cld.hkjc.com/graphql/base/'; // Replace with your endpoint
    const data = {
        "query": "\n      query matchList($startIndex: Int, $endIndex: Int,$startDate: String, $endDate: String, $matchIds: [String], $tournIds: [String], $fbOddsTypes: [FBOddsType]!, $fbOddsTypesM: [FBOddsType]!, $inplayOnly: Boolean, $featuredMatchesOnly: Boolean, $frontEndIds: [String], $earlySettlementOnly: Boolean, $showAllMatch: Boolean) {\n        matches(startIndex: $startIndex,endIndex: $endIndex, startDate: $startDate, endDate: $endDate, matchIds: $matchIds, tournIds: $tournIds, fbOddsTypes: $fbOddsTypesM, inplayOnly: $inplayOnly, featuredMatchesOnly: $featuredMatchesOnly, frontEndIds: $frontEndIds, earlySettlementOnly: $earlySettlementOnly, showAllMatch: $showAllMatch) {\n          id\n          frontEndId\n          matchDate\n          kickOffTime\n          status\n          updateAt\n          sequence\n          esIndicatorEnabled\n          homeTeam {\n            id\n            name_en\n            name_ch\n          }\n          awayTeam {\n            id\n            name_en\n            name_ch\n          }\n          tournament {\n            id\n            frontEndId\n            nameProfileId\n            isInteractiveServiceAvailable\n            code\n            name_en\n            name_ch\n          }\n          isInteractiveServiceAvailable\n          inplayDelay\n          venue {\n            code\n            name_en\n            name_ch\n          }\n          tvChannels {\n            code\n            name_en\n            name_ch\n          }\n          liveEvents {\n            id\n            code\n          }\n          featureStartTime\n          featureMatchSequence\n          poolInfo {\n            normalPools\n            inplayPools\n            sellingPools\n            ntsInfo\n            entInfo\n            definedPools\n          }\n          runningResult {\n            homeScore\n            awayScore\n            corner\n          }\n          runningResultExtra {\n            homeScore\n            awayScore\n            corner\n          }\n          adminOperation {\n            remark {\n              typ\n            }\n          }\n          foPools(fbOddsTypes: $fbOddsTypes) {\n            id\n            status\n            oddsType\n            instNo\n            inplay\n            name_ch\n            name_en\n            updateAt\n            expectedSuspendDateTime\n            lines {\n              lineId\n              status\n              condition\n              main\n              combinations {\n                combId\n                str\n                status\n                offerEarlySettlement\n                currentOdds\n                selections {\n                  selId\n                  str\n                  name_ch\n                  name_en\n                }\n              }\n            }\n          }\n        }\n      }\n      ",
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
        "endIndex": 60,
        "frontEndIds": null,
        "earlySettlementOnly": false,
        "showAllMatch": false,
        "tday": null,
        "tIdList": null
    }
    };

    try {
        const response = await axios.post(url, data);
        for (i = 0; i < response.data.data.matches.length; i++) {
            console.log('kickOffTime:', response.data.data.matches[i].kickOffTime);
            console.log('frontEndId:', response.data.data.matches[i].frontEndId);
            console.log('homeTeam:', response.data.data.matches[i].homeTeam.name_en);
            console.log('awayTeam:', response.data.data.matches[i].awayTeam.name_en);
        }
    } catch (error) {
        console.error('Error occurred:', error.message); // Handle errors
    }
}

// Call the function
postData();
