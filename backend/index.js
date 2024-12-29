const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const matchRoutes = require('./routes/match.routes');
const adminRoutes = require('./routes/admin.routes');
const memberRoutes = require('./routes/member.routes');
const seedAdmins = require('./seeders/admin.seeder');
const TelemetryService = require('./services/telemetry.service');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/betting-china', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    TelemetryService.log('info', 'MongoDB connected');
    seedAdmins();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    TelemetryService.log('error', 'MongoDB connection error', { error: err.message });
  });

// Use CORS to allow requests from your frontend
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Use match routes
app.use('/', matchRoutes);
app.use('/admin', adminRoutes);
app.use('/member', memberRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
  TelemetryService.log('info', `Server running on port: ${port}`);
});
