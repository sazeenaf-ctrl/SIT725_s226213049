const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

// Virtual to expose price as a plain string when serialised to JSON
bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.price) {
      ret.price = parseFloat(ret.price.toString());
    }
    return ret;
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
