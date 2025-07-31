const express = require('express');
const cors = require('cors');
// import connectDB from './db';
const bodyParser = require('body-parser');
require('dotenv').config(); // ✅ Load env variables
 const connectDB = require('./db'); // ✅ Your MongoDB Atlas connection file
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB Atlas
connectDB(); // Make sure this function handles mongoose.connect()

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);

// Sample test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hi from Vercel!" });
});

// ✅ Export the app instead of starting it (for Vercel)
module.exports = app;

// ✅ Optional: Local development server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
