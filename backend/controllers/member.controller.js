const bcrypt = require('bcrypt');
const { Member } = require('../models/member.model');

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
        return res.status(404).json({ message: 'Member not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, member.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      if (member.blocked) {
        return res.status(403).json({ message: 'Member is blocked' });
      }

      // Check IP address
      const clientIp = req.ip; // Assuming Express's req.ip
      if (!member.ipAddresses.includes(clientIp)) {
        if (member.ipAddresses.length >= 3) {
          member.blocked = true;
          await member.save();
          return res.status(403).json({ message: 'Too many IP addresses. Account blocked.' });
        } else {
          member.ipAddresses.push(clientIp);
          await member.save();
        }
      }

      res.status(200).json({ message: 'Member login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
}

module.exports = MemberController;
