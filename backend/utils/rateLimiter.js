const mongoose = require('mongoose');

const RateLimitSchema = new mongoose.Schema({
  clientId: { 
    type: String, 
    required: true, 
    unique: true,
    default: "global"
  },
  count: { type: Number, required: true, default: 0 },
  lastReset: { type: Date, required: true, default: Date.now }
});

RateLimitSchema.index({ lastReset: 1 }, { expireAfterSeconds: 86400 });

const RateLimit = mongoose.model('RateLimit', RateLimitSchema);

class MongoRateLimiter {
  constructor({ limit, windowMs }) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  async checkRateLimit(clientId = "global") {
    const now = Date.now();
    const windowStart = new Date(now - this.windowMs);

    const entry = await RateLimit.findOneAndUpdate(
      { clientId },
      [{
        $set: {
          count: {
            $cond: {
              if: { $gte: ["$lastReset", windowStart] },
              then: { $add: ["$count", 1] },
              else: 1
            }
          },
          lastReset: {
            $cond: {
              if: { $gte: ["$lastReset", windowStart] },
              then: "$lastReset",
              else: now
            }
          }
        }
      }],
      { new: true, upsert: true }
    ).exec();

    if (entry.count > this.limit) {
      const retryAfter = Math.ceil((entry.lastReset.getTime() + this.windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    return { allowed: true };
  }
}

module.exports = { MongoRateLimiter };
