const fs = require("fs");
const Fuse = require("fuse.js");
const axios = require("axios");
const { fetchAllData } = require("./data/api-fixtures");

const { Match } = require("./models/match.model");

// Function to get scraped HK team names
async function getHKMatches() {
  // Get latest cached data from database
  const cachedMatch = await Match.findOne({ 
    cacheKey: "hkMatches",
    lastUpdated: { $gt: new Date(Date.now() - 120 * 1000) } // 2 minutes TTL
  }).sort({ lastUpdated: -1 });

  if (cachedMatch) {
    return cachedMatch.data;
  }

  // If no valid cache, return empty array (the periodic updater will populate it)
  return [];
}

// Function to fetch and update HK matches
async function updateHKMatches() {
  const url = "https://info.cld.hkjc.com/graphql/base/";
  const data = {
    "query":
      `
      query matchList($startIndex: Int, $endIndex: Int,$startDate: String, $endDate: String, $matchIds: [String], $tournIds: [String], $fbOddsTypes: [FBOddsType]!, $fbOddsTypesM: [FBOddsType]!, $inplayOnly: Boolean, $featuredMatchesOnly: Boolean, $frontEndIds: [String], $earlySettlementOnly: Boolean, $showAllMatch: Boolean) {
        matches(startIndex: $startIndex,endIndex: $endIndex, startDate: $startDate, endDate: $endDate, matchIds: $matchIds, tournIds: $tournIds, fbOddsTypes: $fbOddsTypesM, inplayOnly: $inplayOnly, featuredMatchesOnly: $featuredMatchesOnly, frontEndIds: $frontEndIds, earlySettlementOnly: $earlySettlementOnly, showAllMatch: $showAllMatch) {
          id
          frontEndId
          matchDate
          kickOffTime
          status
          updateAt
          sequence
          esIndicatorEnabled
          homeTeam {
            id
            name_en
            name_ch
          }
          awayTeam {
            id
            name_en
            name_ch
          }
          tournament {
            id
            frontEndId
            nameProfileId
            isInteractiveServiceAvailable
            code
            name_en
            name_ch
          }
          isInteractiveServiceAvailable
          inplayDelay
          venue {
            code
            name_en
            name_ch
          }
          tvChannels {
            code
            name_en
            name_ch
          }
          liveEvents {
            id
            code
          }
          featureStartTime
          featureMatchSequence
          poolInfo {
            normalPools
            inplayPools
            sellingPools
            ntsInfo
            entInfo
            definedPools
          }
          runningResult {
            homeScore
            awayScore
            corner
            homeCorner
            awayCorner
          }
          runningResultExtra {
            homeScore
            awayScore
            corner
            homeCorner
            awayCorner
          }
          adminOperation {
            remark {
              typ
            }
          }
          foPools(fbOddsTypes: $fbOddsTypes) {
            id
            status
            oddsType
            instNo
            inplay
            name_ch
            name_en
            updateAt
            expectedSuspendDateTime
            lines {
              lineId
              status
              condition
              main
              combinations {
                combId
                str
                status
                offerEarlySettlement
                currentOdds
                selections {
                  selId
                  str
                  name_ch
                  name_en
                }
              }
            }
          }
        }
      }
      `,
    "variables": {
      "fbOddsTypes": [
        "HDC",
        "EDC",
      ],
      "fbOddsTypesM": [
        "HDC",
        "EDC",
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
      "tIdList": null,
    },
  };

  try {
    const response = await axios.post(url, data);
    const matches = response.data.data.matches;

    // Update cache in database
    await Match.findOneAndUpdate(
      { cacheKey: "hkMatches" },
      {
        $set: {
          data: matches,
          lastUpdated: new Date()
        }
      },
      { upsert: true }
    );

    return matches;
  } catch (error) {
    console.error("Error fetching HK teams:", error.message);
    return [];
  }
}

// Match teams using Fuse.js
function matchTeams(apiTeams, hkTeam) {
  const fuse = new Fuse(apiTeams, { keys: ["team"], threshold: 0.4 });
  let matchedTeam;

  const result = fuse.search(hkTeam[0].team);
  if (result && result.length > 0) {
    const item = result[0].item; // Get the first match from the search result
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
      .filter((match) => match.frontEndId === id) // Filter matches by `id`
      .map((match) => ({
        id: id,
        team: `${match.homeTeam.name_en} vs ${match.awayTeam.name_en}`,
      }));

    // Match HK teams with API teams
    const matchedTeam = matchTeams(apiTeams, hkTeam);

    return matchedTeam;
  } catch (error) {
    console.error("Error processing teams:", error.message);
  }
}

module.exports = { processTeams, getHKMatches };
