const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files from /public
app.use(express.static(__dirname + '/public'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.set('io', io);

let connectedClients = 0;

io.on('connection', (socket) => {
  connectedClients += 1;
  io.emit('stats:viewers', { viewers: connectedClients });

  socket.on('disconnect', () => {
    connectedClients = Math.max(0, connectedClients - 1);
    io.emit('stats:viewers', { viewers: connectedClients });
  });
});

// Import route file
const booksRoutes = require('./routes/books.routes');

// Mount the route at /api/books
app.use('/api/books', booksRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Books Catalog Home Page!');
});

http.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
