const { handleResult } = require('../handleResult');
const { Match } = require('../models/match.model');
const { MongoRateLimiter } = require('../utils/rateLimiter');
const TelemetryService = require('../services/telemetry.service'); // Add telemetry import

// Initialize rate limiter: 10/minute with fixed clientId
const resultLimiter = new MongoRateLimiter({
  limit: 10, // Reduced from 200 to 10
  windowMs: 60 * 1000, // 1 minute (same)
  clientId: "global_results" // Fixed clientId for all rate limit checks
});

async function cachedHandleResult(id) {
  try {
    await TelemetryService.log('debug', 'Starting cache check', { matchId: id });
    
    // Check cache first
    const cached = await Match.findOne({
      id,
      'cachedData.expiresAt': { $gt: new Date() }
    }).lean();

    if (cached?.cachedData) {
      await TelemetryService.log('info', 'Cache hit', {
        matchId: id,
        ttl: cached.cachedData.expiresAt - Date.now()
      });
      return {
        homeWinRate: cached.cachedData.homeWinRate,
        awayWinRate: cached.cachedData.awayWinRate
      };
    }

    await TelemetryService.log('debug', 'Cache miss', { matchId: id });

    // Apply rate limiting
    const limitCheck = await resultLimiter.checkRateLimit();
    if (!limitCheck.allowed) {
      await TelemetryService.log('warn', 'Rate limit exceeded', {
        matchId: id,
        retryAfter: limitCheck.retryAfter,
        limit: resultLimiter.limit,
        window: resultLimiter.windowMs
      });
      throw new Error(`Rate limit exceeded. Try again in ${limitCheck.retryAfter} seconds`);
    }

    await TelemetryService.log('debug', 'Rate limit check passed', {
      matchId: id,
      remaining: resultLimiter.limit - limitCheck.count
    });

    // Fetch fresh data
    await TelemetryService.log('info', 'Fetching fresh data', { matchId: id });
    const result = await handleResult(id);

    // Update cache with TTL
    await TelemetryService.log('debug', 'Updating cache', {
      matchId: id,
      expiresAt: new Date(Date.now() + 3600000)
    });
    
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

    await TelemetryService.log('info', 'Cache updated successfully', { matchId: id });
    return result;

  } catch (error) {
    await TelemetryService.log('error', 'CachedHandleResult error', {
      matchId: id,
      error: error.message,
      stack: error.stack?.split('\n')[0] // First line of stack trace only
    });
    throw error;
  }
}

module.exports = { cachedHandleResult };
