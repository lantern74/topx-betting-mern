const bcrypt = require('bcryptjs');
const { Admin } = require('../models/admin.model');
const { Member } = require('../models/member.model');
const SessionService = require('../services/session.service');
const mongoose = require('mongoose');

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

      const sessionId = await SessionService.createSession(admin._id);

      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(200).json({ message: 'Admin login successful', role: admin.role });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }

    /**
     * Handles admin logout.
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
                return res.status(400).json({ message: 'No session ID provided' });
            }

            await SessionService.revokeSession(sessionId);

            res.clearCookie('sessionId', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            res.status(200).json({ message: 'Admin logout successful' });
        } catch (error) {
            res.status(500).json({ message: 'Error logging out', error: error.message });
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
      const { username, password, price, date } = req.body;
        const admin = req.admin;

      const existingMember = await Member.findOne({ username });

      if (existingMember) {
        return res.status(400).json({ message: 'Member already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newMember = new Member({
        username,
        password: hashedPassword,
        price,
          date,
        createdBy: admin.id,
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
      const isAdmin = req.admin.role === 'main';
      const members = await Member.find().populate('createdBy', isAdmin ? 'username' : null);
      const formattedMembers = members.map(member => {
        const formattedMember = {
          ...member.toObject(),
        };
        if (!isAdmin) {
          delete formattedMember.createdBy;
        }
        return formattedMember;
      });
      res.status(200).json(formattedMembers);
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

    /**
   * Updates a sub-admin's username.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async updateSubAdmin(req, res) {
    try {
      const { id } = req.params;
      const { username, password } = req.body;

        const updateFields = { username };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        updateFields,
        { new: true }
      );

      if (!updatedAdmin) {
        return res.status(404).json({ message: 'Sub-admin not found' });
      }

      res.status(200).json({ message: 'Sub-admin updated successfully', updatedAdmin });
    } catch (error) {
      res.status(500).json({ message: 'Error updating sub-admin', error: error.message });
    }
  }

    /**
   * Updates a sub-admin's password.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
    static async updateSubAdminPassword(req, res) {
        try {
            const { id } = req.params;
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedAdmin = await Admin.findByIdAndUpdate(
                id,
                { password: hashedPassword },
                { new: true }
            );

            if (!updatedAdmin) {
                return res.status(404).json({ message: 'Sub-admin not found' });
            }

            res.status(200).json({ message: 'Sub-admin password updated successfully', updatedAdmin });
        } catch (error) {
            res.status(500).json({ message: 'Error updating sub-admin password', error: error.message });
        }
    }


  /**
   * Deletes a sub-admin.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async deleteSubAdmin(req, res) {
    try {
      const { id } = req.params;
      const deletedAdmin = await Admin.findByIdAndDelete(id);

      if (!deletedAdmin) {
        return res.status(404).json({ message: 'Sub-admin not found' });
      }

      res.status(200).json({ message: 'Sub-admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting sub-admin', error: error.message });
    }
  }

    /**
     * Blocks a member.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     * @static
     * @async
     */
    static async blockMember(req, res) {
        try {
            const { id } = req.params;
            const updatedMember = await Member.findByIdAndUpdate(
                id,
                { blocked: true },
                { new: true }
            );

            if (!updatedMember) {
                return res.status(404).json({ message: 'Member not found' });
            }

            await SessionService.revokeAllSessions(updatedMember._id);

            res.status(200).json({ message: 'Member blocked successfully', updatedMember });
        } catch (error) {
            res.status(500).json({ message: 'Error blocking member', error: error.message });
        }
    }

    /**
     * Unblocks a member.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     * @static
     * @async
     */
    static async unblockMember(req, res) {
        try {
            const { id } = req.params;
            const updatedMember = await Member.findByIdAndUpdate(
                id,
                { blocked: false },
                { new: true }
            );

            if (!updatedMember) {
                return res.status(404).json({ message: 'Member not found' });
            }

            res.status(200).json({ message: 'Member unblocked successfully', updatedMember });
        } catch (error) {
            res.status(500).json({ message: 'Error unblocking member', error: error.message });
        }
    }

    /**
     * Updates a member's username, password, and price.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     * @static
     * @async
     */
    static async updateMember(req, res) {
        try {
            const { id } = req.params;
            const { username, password, price } = req.body;

            const updateFields = {};
            if (username) {
                updateFields.username = username;
            }
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateFields.password = hashedPassword;
            }
            if (price) {
                updateFields.price = price;
            }

            const updatedMember = await Member.findByIdAndUpdate(
                id,
                updateFields,
                { new: true }
            );

            if (!updatedMember) {
                return res.status(404).json({ message: 'Member not found' });
            }

            res.status(200).json({ message: 'Member updated successfully', updatedMember });
        } catch (error) {
            res.status(500).json({ message: 'Error updating member', error: error.message });
        }
    }

    /**
     * Deletes a member.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     * @returns {Promise<void>}
     * @static
     * @async
     */
    static async deleteMember(req, res) {
        try {
            const { id } = req.params;
            const deletedMember = await Member.findByIdAndDelete(id);

            if (!deletedMember) {
                return res.status(404).json({ message: 'Member not found' });
            }

            res.status(200).json({ message: 'Member deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting member', error: error.message });
        }
    }
}

module.exports = AdminController;
