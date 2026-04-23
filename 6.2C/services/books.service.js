// In-memory books data store
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.99, year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', price: 9.99, year: 1949 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 8.99, year: 1813 },
];

// Get all books
const getAllBooks = () => books;

// Get a single book by ID
const getBookById = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId)) return null;
  return books.find((b) => b.id === numId) || null;
};

// -------------------------------------------------------
// Calculation function: compute total price of a book list
// with an optional discount percentage (0–100)
// -------------------------------------------------------
const calculateTotalPrice = (bookList, discountPercent = 0) => {
  if (!Array.isArray(bookList) || bookList.length === 0) return 0;
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount must be between 0 and 100');
  }
  const subtotal = bookList.reduce((sum, book) => sum + (book.price || 0), 0);
  const discount = subtotal * (discountPercent / 100);
  return parseFloat((subtotal - discount).toFixed(2));
};

module.exports = { getAllBooks, getBookById, calculateTotalPrice };
