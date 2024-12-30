const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin.routes');
const matchRoutes = require('./routes/match.routes');
const memberRoutes = require('./routes/member.routes');
const telemetryRoutes = require('./routes/telemetry.routes');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/admin', adminRoutes);
app.use('/match', matchRoutes);
app.use('/member', memberRoutes);
app.use('/telemetry', telemetryRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
