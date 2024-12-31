const { Session } = require('../models/session.model');
const { v4: uuidv4 } = require('uuid');

/**
 * @class SessionService
 * @classdesc Service for managing user sessions.
 */
class SessionService {
  /**
   * Creates a new session for a user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<string>} - The session ID.
   * @static
   * @async
   */
  static async createSession(userId) {
    const sessionId = uuidv4();
    const session = new Session({
      sessionId,
      userId,
    });
    await session.save();
    return sessionId;
  }

  /**
   * Validates a session by its ID.
   * @param {string} sessionId - The ID of the session.
   * @returns {Promise<object|null>} - The session object if valid, null otherwise.
   * @static
   * @async
   */
  static async validateSession(sessionId) {
    const session = await Session.findOne({ sessionId });
    if (!session) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ sessionId });
      return null;
    }

    return session;
  }

  /**
   * Revokes a session by its ID.
   * @param {string} sessionId - The ID of the session to revoke.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async revokeSession(sessionId) {
    await Session.deleteOne({ sessionId });
  }

  /**
   * Revokes all sessions for a user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async revokeAllSessions(userId) {
    await Session.deleteMany({ userId });
  }

  /**
   * Extends the expiration time of a session.
   * @param {string} sessionId - The ID of the session to extend.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async extendSession(sessionId) {
    const session = await Session.findOne({ sessionId });
    if (session) {
      session.expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Extend by 1 hour
      await session.save();
    }
  }
}

module.exports = SessionService;
