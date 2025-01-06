const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {object} Session
 * @property {string} sessionId - The unique identifier for the session.
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user associated with the session.
 * @property {Date} createdAt - The date the session was created.
 * @property {Date} expiresAt - The date the session expires.
 */
const SessionSchema = new Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 60 * 1000), // Session expires in 1 hour
  },
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = { Session };
