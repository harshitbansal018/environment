const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);

// Sample test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hi from Vercel!" });
});

// ✅ Export the app instead of starting it (Vercel needs this)
module.exports = app;

// ✅ Optional: Start server only if running locally
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
