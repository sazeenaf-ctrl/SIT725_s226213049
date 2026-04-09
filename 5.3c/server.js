const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Hardcoded MongoDB URI (same DB name as seeded)
const MONGO_URI = 'mongodb://localhost:27017/books_catalog';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB: books_catalog'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Serve static files from /public
app.use(express.static(__dirname + '/public'));

// Import route file
const booksRoutes = require('./routes/books.routes');

// Mount the routes at /api/books
app.use('/api/books', booksRoutes);

// GET /api/integrity-check42 → 204 No Content
app.get('/api/integrity-check42', (req, res) => {
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
