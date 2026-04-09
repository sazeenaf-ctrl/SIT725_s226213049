const Book = require('../models/book.model');

// Service function to get all books from MongoDB
const getAllBooks = async () => {
  return await Book.find({});
};

// Service function to get a single book by its MongoDB _id
const getBookById = async (id) => {
  return await Book.findById(id);
};

module.exports = {
  getAllBooks,
  getBookById
};
