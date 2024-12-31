const { SessionService } = require('../services/session.service');
const { Admin } = require('../models/admin.model');

const authenticateAdmin = async (req, res, next) => {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    return res.status(401).json({ message: 'No session ID provided' });
  }

  try {
    const session = await SessionService.validateSession(sessionId);

    if (!session) {
      return res.status(401).json({ message: 'Invalid session' });
    }

    const admin = await Admin.findById(session.userId);

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Error validating session', error: error.message });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
};

module.exports = { authenticateAdmin, authorize };
