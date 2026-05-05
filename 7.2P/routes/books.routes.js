const express = require('express');
const router = express.Router();

// Import all controllers via index.js
const Controllers = require('../controllers');

// GET /api/books → getAllBooks
router.get('/', Controllers.booksController.getAllBooks);

// GET /api/books/:id → getBookById
router.get('/:id', Controllers.booksController.getBookById);

// POST /api/books → addBook
router.post('/', Controllers.booksController.addBook);

module.exports = router;
