const express = require('express');
const cors = require('cors');
const matchRoutes = require('./routes/match');

const app = express();
const port = 5000;

// Use CORS to allow requests from your frontend
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Use match routes
app.use('/', matchRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});
