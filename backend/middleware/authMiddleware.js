const jwt = require('jsonwebtoken');
const { Admin } = require('../models/admin.model');

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token', error: error.message });
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
