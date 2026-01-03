const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};
exports.getBooksByCategory = async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
};
exports.getBooksAfter2015 = async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
};
exports.updateCopies = async (req, res) => {
  const { amount } = req.body;

  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies + amount < 0) {
    return res.status(400).json({ message: "Negative stock not allowed" });
  }

  book.availableCopies += amount;
  await book.save();

  res.json(book);
};
exports.changeCategory = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category: req.body.category },
    { new: true }
  );

  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};
exports.deleteIfZero = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies === 0) {
    await book.deleteOne();
    return res.json({ message: "Book removed" });
  }

  res.status(400).json({ message: "Copies not zero" });
};

