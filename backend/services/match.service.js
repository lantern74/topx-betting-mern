const { getHKMatches } = require("../getAPIFixtureId.js");
const { cachedHandleResult } = require("../data/cached-handleresult");
const { Match } = require("../models/match.model");
const { handleResult } = require("../handleResult.js");

/**
 * @class MatchService
 * @classdesc Service class for handling match-related operations.
 */
class MatchService {
  /**
   * Fetches match data and caches it.
   * @returns {Promise<Array<object>>} - An array of match data.
   * @static
   * @async
   */
  static async getMatchData() {
    const matches = await getHKMatches();

    // Parallel check for cached matches
    const cacheCheckPromises = matches.map((match) =>
      Match.findOne({
        id: match.frontEndId,
        "cachedData.expiresAt": { $gt: new Date() },
      })
    );

    const cachedMatches = await Promise.all(cacheCheckPromises);

    // Parallel processing for all matches
    const matchDatas = await Promise.all(matches.map(async (match, index) => {
      if (cachedMatches[index]?.cachedData) {
        return {
          time: match.kickOffTime,
          id: match.frontEndId,
          homeTeamName: match.homeTeam.name_ch,
          awayTeamName: match.awayTeam.name_ch,
          homeWinRate: cachedMatches[index].cachedData.homeWinRate,
          awayWinRate: cachedMatches[index].cachedData.awayWinRate,
        };
      }

      try {
        // Process uncached matches in parallel
        const resultData = await cachedHandleResult(match.frontEndId);
        // await Match.findOneAndUpdate(
        //   { id: match.frontEndId },
        //   {
        //     $set: {
        //       cachedData: {
        //         homeWinRate: resultData.homeWinRate,
        //         awayWinRate: resultData.awayWinRate,
        //         expiresAt: new Date(Date.now() + 3600000) // 1 hour
        //       }
        //     }
        //   },
        //   { upsert: true, new: true }
        // );

        return {
          time: match.kickOffTime,
          id: match.frontEndId,
          homeTeamName: match.homeTeam.name_ch,
          awayTeamName: match.awayTeam.name_ch,
          homeWinRate: resultData.homeWinRate,
          awayWinRate: resultData.awayWinRate,
        };
      } catch (error) {
        console.error(`Error processing match ${match.frontEndId}:`, error);
        return {
          time: match.kickOffTime,
          id: match.frontEndId,
          homeTeamName: match.homeTeam.name_ch,
          awayTeamName: match.awayTeam.name_ch,
          homeWinRate: "N/A",
          awayWinRate: "N/A",
        };
      }
    }));

    return matchDatas;
  }

  /**
   * Fetches match result based on ID.
   * @param {string} id - The ID of the match.
   * @returns {Promise<object>} - The match result data.
   * @static
   * @async
   */
  static async getMatchResult(id) {
    const resultData = handleResult(id);
    let match = await Match.findOne({ id: id });

    if (!match) {
      console.log("Creating new match");
      match = new Match({
        id: id,
        time: new Date(), // Placeholder, adjust as needed
        ...(await resultData),
      });
      await match.save();
    } else {
      // Update existing match data
      new Promise(async (resolve, reject) => {
        try {
          console.log("Updating existing match");
          Object.assign(match, {
            ...resultData,
            time: resultData.time ?? match.time ?? new Date(),
          });
          await match.save();
          resolve(resultData);
        } catch (error) {
          reject(error);
        }
      });
    }

    return resultData;
  }
}

module.exports = MatchService;
