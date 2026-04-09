// Import the service
const booksService = require('../services/books.service');

// Controller uses the service to get all books
exports.getAllBooks = (req, res) => {
  const items = booksService.getAllBooks();
  res.json({
    status: 200,
    data: items,
    message: 'Books catalog retrieved using service'
  });
};

// Controller uses the service to get a book by id
exports.getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({
      status: 404,
      data: null,
      message: 'Book not found'
    });
  }
  res.json({
    status: 200,
    data: book,
    message: 'Book retrieved using service'
  });
};
