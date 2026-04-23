const booksService = require('../services/books.service');

// GET /api/books — return all books
exports.getAllBooks = (req, res) => {
  const items = booksService.getAllBooks();
  res.json({ status: 200, data: items, message: 'Books catalog retrieved' });
};

// GET /api/books/:id — return a single book
exports.getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ status: 404, data: null, message: 'Book not found' });
  }
  res.json({ status: 200, data: book, message: 'Book retrieved' });
};

// GET /api/books/price/total?discount=10 — total price with optional discount
exports.getTotalPrice = (req, res) => {
  const discount = parseFloat(req.query.discount) || 0;
  if (isNaN(discount) || discount < 0 || discount > 100) {
    return res.status(400).json({ status: 400, data: null, message: 'Invalid discount value' });
  }
  const books = booksService.getAllBooks();
  const total = booksService.calculateTotalPrice(books, discount);
  res.json({ status: 200, data: { total, discount }, message: 'Total price calculated' });
};
