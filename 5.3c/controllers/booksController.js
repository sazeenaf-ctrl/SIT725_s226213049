const booksService = require('../services/books.service');

// Controller uses the service to get all books
exports.getAllBooks = async (req, res) => {
  try {
    const items = await booksService.getAllBooks();
    res.json({
      status: 200,
      data: items,
      message: 'Books catalog retrieved using service'
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Server error: ' + err.message
    });
  }
};

// Controller uses the service to get a book by id
exports.getBookById = async (req, res) => {
  try {
    const book = await booksService.getBookById(req.params.id);
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
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Server error: ' + err.message
    });
  }
};
