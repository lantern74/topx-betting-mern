const bcrypt = require("bcryptjs");
const { Member } = require("../models/member.model");
const SessionService = require("../services/session.service");

/**
 * @class MemberController
 * @classdesc Controller for member-related operations.
 */
class MemberController {
  /**
   * Handles member login.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const member = await Member.findOne({ username });

      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, member.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      if (member.blocked) {
        return res.status(403).json({ message: "Member is blocked" });
      }

      // Check IP address
      const clientIp = req.ip || req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress;
      console.log(
        `Login attempt from IP: ${clientIp} for member: ${member.username}`,
      );

      if (!member.ipAddresses.includes(clientIp)) {
        if (member.ipAddresses.length >= 3) {
          member.blocked = true;
          await member.save();
          console.log(
            `Member ${member.username} blocked due to too many IP addresses`,
          );
          return res.status(403).json({
            message: "Too many IP addresses. Account blocked.",
            code: "IP_LIMIT_EXCEEDED",
          });
        } else {
          member.ipAddresses.push(clientIp);
          await member.save();
          console.log(
            `New IP address added for member ${member.username}: ${clientIp}`,
          );
        }
      }

      const sessionId = await SessionService.createSession(member._id);

      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({ message: "Member login successful" });
    } catch (error) {
      res.status(500).json({
        message: "Error logging in",
        error: error.message,
      });
    }
  }

  /**
   * Handles member logout.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async logout(req, res) {
    try {
      const sessionId = req.cookies?.sessionId;

      if (!sessionId) {
        return res.status(400).json({ message: "No session ID provided" });
      }

      await SessionService.revokeSession(sessionId);

      res.clearCookie("sessionId", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({ message: "Member logout successful" });
    } catch (error) {
      res.status(500).json({
        message: "Error logging out",
        error: error.message,
      });
    }
  }

    /**
     * Checks if a member is authenticated.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     * @static
     * @async
     */
    static async checkAuth(req, res) {
        try {
            const sessionId = req.cookies?.sessionId;

            if (!sessionId) {
                return res.status(401).json({ message: 'No session ID provided' });
            }

            const session = await SessionService.validateSession(sessionId);

            if (!session) {
                return res.status(401).json({ message: 'Invalid session' });
            }

            const member = await Member.findById(session.userId);

            if (!member) {
                return res.status(404).json({ message: 'Member not found' });
            }

            if (member.blocked) {
                return res.status(403).json({ message: 'Member is blocked' });
            }

            res.status(200).json({ message: 'Member is authenticated' });
        } catch (error) {
            res.status(500).json({ message: 'Error checking authentication', error: error.message });
        }
    }
}

module.exports = MemberController;
