const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef {object} Member
 * @property {string} username - The username of the member.
 * @property {string} password - The password of the member.
 * @property {Date} createdAt - The date the member was created.
 * @property {number} price - The price associated with the member.
 * @property {boolean} blocked - Whether the member is blocked.
 * @property {string[]} ipAddresses - The IP addresses the member has logged in from.
 * @property {mongoose.Schema.Types.ObjectId} createdBy - The ID of the admin who created the member.
 */
const MemberSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  price: { type: Number },
  blocked: { type: Boolean, default: false },
  ipAddresses: [{ type: String }],
  date: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = { Member };
