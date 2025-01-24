const { getHKMatches } = require("../getAPIFixtureId.js");
const { handleResult } = require("../handleResult.js");
const { Match } = require("../models/match.model");

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
    const cacheCheckPromises = matches.map(match => 
      Match.findOne({ 
        id: match.frontEndId,
        "cachedData.expiresAt": { $gt: new Date() }
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
          awayWinRate: cachedMatches[index].cachedData.awayWinRate
        };
      }

      try {
        // Process uncached matches in parallel
        // const [resultData] = await Promise.all([
        //   handleResult(match.frontEndId),
        //   Match.findOneAndUpdate(
        //     { id: match.frontEndId },
        //     {
        //       $set: {
        //         cachedData: {
        //           homeWinRate: resultData.homeWinRate,
        //           awayWinRate: resultData.awayWinRate,
        //           expiresAt: new Date(Date.now() + 3600000) // 1 hour
        //         }
        //       }
        //     },
        //     { upsert: true, new: true }
        //   )
        // ]);

        return {
          time: match.kickOffTime,
          id: match.frontEndId,
          homeTeamName: match.homeTeam.name_ch,
          awayTeamName: match.awayTeam.name_ch,
          // homeWinRate: resultData.homeWinRate,
          // awayWinRate: resultData.awayWinRate
        };
      } catch (error) {
        console.error(`Error processing match ${match.frontEndId}:`, error);
        return {
          time: match.kickOffTime,
          id: match.frontEndId,
          homeTeamName: match.homeTeam.name_ch,
          awayTeamName: match.awayTeam.name_ch,
          homeWinRate: 'N/A',
          awayWinRate: 'N/A'
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
    const resultData = await handleResult(id);
    let match = await Match.findOne({ id: id });

    if (!match) {
      match = new Match({
        id: id,
        time: new Date(), // Placeholder, adjust as needed
        ...resultData,
      });
      await match.save();
    } else {
      // Update existing match data
      Object.assign(match, resultData);
      await match.save();
    }

    return resultData;
  }
}

module.exports = MatchService;
