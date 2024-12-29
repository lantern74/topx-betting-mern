const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const matchRoutes = require('./routes/MatchRoutes');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/betting-china', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use CORS to allow requests from your frontend
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Use match routes
app.use('/', matchRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
