const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin.routes');
const matchRoutes = require('./routes/match.routes');
const memberRoutes = require('./routes/member.routes');
const path = require('path');
const TelemetryService = require('./services/telemetry.service');
const cookieParser = require('cookie-parser');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Add cookie parsing middleware


const uri = process.env.ATLAS_URI || "mongodb://root:example@localhost:27017/betting-china?authSource=admin";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Apply session middleware before other routes
app.use('/admin', adminRoutes);
app.use('/match', matchRoutes);
app.use('/member', memberRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Global error handling middleware
app.use(async (err, req, res, next) => {
  await TelemetryService.log('error', 'API Error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    params: req.params,
  });
  console.error('Global Error Handler:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
