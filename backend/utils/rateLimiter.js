const mongoose = require('mongoose');

const RateLimitSchema = new mongoose.Schema({
  clientId: { 
    type: String, 
    required: true, 
    unique: true,
    default: "global" // Add default value
  },
  count: { type: Number, required: true, default: 0 },
  lastReset: { type: Date, required: true, default: Date.now }
});

RateLimitSchema.index({ lastReset: 1 }, { expireAfterSeconds: 86400 }); // Cleanup after 24h

const RateLimit = mongoose.model('RateLimit', RateLimitSchema);

class MongoRateLimiter {
  constructor({ limit, windowMs }) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  async checkRateLimit(clientId = "global") { // Add default value
    const now = Date.now();
    const windowStart = new Date(now - this.windowMs);

    const entry = await RateLimit.findOneAndUpdate(
      { clientId, lastReset: { $gte: windowStart } },
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true } // Add upsert options
    ).exec();

    if (entry.count > this.limit) {
      const retryAfter = Math.ceil((entry.lastReset.getTime() + this.windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    return { allowed: true };
  }
}

module.exports = { MongoRateLimiter };
