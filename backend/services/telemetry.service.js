const mongoose = require("mongoose");

/**
 * @typedef {object} TelemetryLog
 * @property {Date} timestamp - The timestamp of the log.
 * @property {string} level - The log level (e.g., 'info', 'error', 'warn').
 * @property {string} message - The log message.
 * @property {object} [metadata] - Optional metadata associated with the log.
 */
const TelemetryLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  level: { type: String, required: true },
  message: { type: String, required: true },
  metadata: { type: mongoose.Schema.Types.Mixed },
});

const TelemetryLog = mongoose.model("TelemetryLog", TelemetryLogSchema);

/**
 * @class TelemetryService
 * @classdesc Service for logging messages to MongoDB.
 */
class TelemetryService {
  /**
   * Logs a message to the database.
   * @param {string} level - The log level.
   * @param {string} message - The log message.
   * @param {object} [metadata] - Optional metadata.
   * @returns {Promise<void>}
   * @static
   * @async
   */
  static async log(level, message, metadata = {}) {
    try {
      const logEntry = new TelemetryLog({ level, message, metadata });
      await logEntry.save();
      console.log(`[${level}] ${message}`, metadata);
    } catch (error) {
      console.error("Error logging to database:", error);
    }
  }
}

module.exports = TelemetryService;
