/**
 * test/calculation.test.js
 * Unit tests for the calculateTotalPrice() function
 * Tests valid behaviour, edge cases, and error/invalid inputs
 */

const chai = require('chai');
const expect = chai.expect;
const { calculateTotalPrice } = require('../services/books.service');

describe('calculateTotalPrice() — Calculation Function', function () {

  const sampleBooks = [
    { id: 1, title: 'Book A', price: 10.00 },
    { id: 2, title: 'Book B', price: 20.00 },
    { id: 3, title: 'Book C', price: 15.00 },
  ];

  // ── Valid behaviour ─────────────────────────────────────
  describe('Valid behaviour', function () {

    it('should return the correct total with no discount (0%)', function () {
      const total = calculateTotalPrice(sampleBooks, 0);
      expect(total).to.equal(45.00);
    });

    it('should return the correct total with a 10% discount', function () {
      const total = calculateTotalPrice(sampleBooks, 10);
      // 45 - 10% = 40.50
      expect(total).to.equal(40.50);
    });

    it('should return 0 when a 100% discount is applied', function () {
      const total = calculateTotalPrice(sampleBooks, 100);
      expect(total).to.equal(0);
    });

    it('should return 0 for an empty book list', function () {
      const total = calculateTotalPrice([], 0);
      expect(total).to.equal(0);
    });

  });

  // ── Edge cases ──────────────────────────────────────────
  describe('Edge cases', function () {

    it('should treat missing price as 0', function () {
      const booksWithMissingPrice = [{ id: 5, title: 'No Price' }];
      const total = calculateTotalPrice(booksWithMissingPrice, 0);
      expect(total).to.equal(0);
    });

    it('should handle a single book correctly', function () {
      const total = calculateTotalPrice([{ id: 1, price: 9.99 }], 0);
      expect(total).to.equal(9.99);
    });

    it('default discount should be 0 when not provided', function () {
      const total = calculateTotalPrice(sampleBooks);
      expect(total).to.equal(45.00);
    });

  });

  // ── Invalid / error behaviour ───────────────────────────
  describe('Invalid / error behaviour', function () {

    it('should throw an error when discount is greater than 100', function () {
      expect(() => calculateTotalPrice(sampleBooks, 150)).to.throw(
        'Discount must be between 0 and 100'
      );
    });

    it('should throw an error when discount is negative', function () {
      expect(() => calculateTotalPrice(sampleBooks, -10)).to.throw(
        'Discount must be between 0 and 100'
      );
    });

    it('should return 0 when a non-array is passed', function () {
      const total = calculateTotalPrice(null, 0);
      expect(total).to.equal(0);
    });

  });

});
