const { handleResult } = require('../handleResult');
const { Match } = require('../models/match.model');
const { MongoRateLimiter } = require('../utils/rateLimiter');

// Initialize rate limiter: 200/minute
const resultLimiter = new MongoRateLimiter({
  limit: 200,
  windowMs: 60 * 1000 // 1 minute
});

async function cachedHandleResult(id) {
  // Check cache first
  const cached = await Match.findOne({
    id,
    'cachedData.expiresAt': { $gt: new Date() }
  }).lean();

  if (cached?.cachedData) {
    return {
      homeWinRate: cached.cachedData.homeWinRate,
      awayWinRate: cached.cachedData.awayWinRate
    };
  }

  // Apply rate limiting
  const limitCheck = await resultLimiter.checkRateLimit('global_results');
  if (!limitCheck.allowed) {
    throw new Error(`Rate limit exceeded. Try again in ${limitCheck.retryAfter} seconds`);
  }

  // Fetch fresh data
  const result = await handleResult(id);

  // Update cache with TTL
  await Match.findOneAndUpdate(
    { id },
    {
      $set: {
        cachedData: {
          homeWinRate: result.homeWinRate,
          awayWinRate: result.awayWinRate,
          expiresAt: new Date(Date.now() + 3600000) // 1 hour
        }
      }
    },
    { upsert: true, new: true }
  );

  return result;
}

module.exports = { cachedHandleResult };
