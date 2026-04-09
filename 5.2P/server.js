const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from /public
app.use(express.static(__dirname + '/public'));

// Import route file
const booksRoutes = require('./routes/books.routes');

// Mount the route at /api/books
app.use('/api/books', booksRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Books Catalog Home Page!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
