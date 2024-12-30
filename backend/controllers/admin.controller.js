const bcrypt = require('bcrypt');
const { Admin } = require('../models/admin.model');
const { Member } = require('../models/member.model');

/**
 * @class AdminController
 * @classdesc Controller for admin-related operations.
 */
class AdminController {
  /**
   * Handles admin login.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      res.status(200).json({ message: 'Admin login successful', role: admin.role, token: 'admin-token' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }

  /**
   * Registers a new sub-admin.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async registerSubAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const existingAdmin = await Admin.findOne({ username });

      if (existingAdmin) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newSubAdmin = new Admin({
        username,
        password: hashedPassword,
        role: 'sub',
      });

      await newSubAdmin.save();
      res.status(201).json({ message: 'Sub-admin registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering sub-admin', error: error.message });
    }
  }

  /**
   * Registers a new member.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async registerMember(req, res) {
    try {
      const { username, password, price, createdBy } = req.body;
      const existingMember = await Member.findOne({ username });

      if (existingMember) {
        return res.status(400).json({ message: 'Member already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newMember = new Member({
        username,
        password: hashedPassword,
        price,
        createdBy,
      });

      await newMember.save();
      res.status(201).json({ message: 'Member registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering member', error: error.message });
     }
  }

  /**
   * Gets all members.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async getAllMembers(req, res) {
    try {
      console.log("AdminController: getAllMembers - fetching members");
      const members = await Member.find().populate('createdBy', 'username');
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching members', error: error.message });
    }
  }

    /**
   * Gets all sub-admins.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
    static async getAllSubAdmins(req, res) {
        try {
            console.log("AdminController: getAllSubAdmins - fetching sub-admins");
            const subAdmins = await Admin.find({ role: 'sub' });
            res.status(200).json(subAdmins);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching sub-admins', error: error.message });
        }
    }
}

module.exports = AdminController;
