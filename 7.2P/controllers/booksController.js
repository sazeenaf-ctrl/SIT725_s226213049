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

exports.addBook = (req, res) => {
  const { title, author, year, genre, summary } = req.body || {};

  if (!title || !author) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: 'title and author are required'
    });
  }

  const newBook = booksService.addBook({
    title: String(title),
    author: String(author),
    year: year === undefined || year === null || year === '' ? undefined : Number(year),
    genre: genre ? String(genre) : undefined,
    summary: summary ? String(summary) : undefined
  });

  const io = req.app?.get('io');
  if (io) io.emit('books:added', newBook);

  res.status(201).json({
    status: 201,
    data: newBook,
    message: 'Book added'
  });
};
