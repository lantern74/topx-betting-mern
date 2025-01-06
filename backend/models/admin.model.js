const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {object} Admin
 * @property {string} username - The username of the admin.
 * @property {string} password - The password of the admin.
 * @property {string} role - The role of the admin ('main' or 'sub').
 * @property {Date} createdAt - The date the admin was created.
 */
const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, enum: ["main", "sub"] },
  createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = { Admin };
