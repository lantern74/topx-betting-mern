const MatchService = require("../services/match.service");

/**
 * @class MatchController
 * @classdesc Controller class for handling match-related requests.
 */
class MatchController {
  /**
   * Handles request to get match data.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async getMatchData(req, res) {
    try {
      const matchData = await MatchService.getMatchData();
      res.json(matchData);
    } catch (error) {
      console.error("Error fetching match data:", error.message);
      res.status(500).json({ error: "Error fetching match data" });
    }
  }

  /**
   * Handles request to get match result by ID.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async getMatchResult(req, res) {
    const { id } = req.params;
    try {
      const resultData = await MatchService.getMatchResult(id);
      res.json(resultData);
    } catch (error) {
      console.error(`Error fetching match result for ID ${id}:`, error.message);
      console.error(error)
      res.status(500).json({ 
        error: "Error fetching match result",
        id,
        details: error.message 
      });
    }
  }
}

module.exports = MatchController;
