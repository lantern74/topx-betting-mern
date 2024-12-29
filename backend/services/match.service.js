const { getHKMatches } = require('../getAPIFixtureId.js');
const { handleResult } = require('../handleResult.js');
const { Match } = require('../models/match.model');

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
    const matchDatas = matches.map((match) => ({
      time: match.kickOffTime,
      id: match.frontEndId,
      homeTeamName: match.homeTeam.name_ch,
      awayTeamName: match.awayTeam.name_ch,
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
