const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// NOTE: /price/total must come before /:id so Express doesn't treat "price" as an id
router.get('/price/total', booksController.getTotalPrice);
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);

module.exports = router;
