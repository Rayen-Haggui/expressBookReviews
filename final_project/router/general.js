const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Part D: Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists. Please choose a different username." });
  }

  users.push({ username, password });
  return res.status(201).json({ message: `User '${username}' registered successfully` });
});

// Part D: Get the full book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Part D: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  }
});

// Part D: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();

  const matchingBooks = Object.entries(books)
    .filter(([, book]) => book.author.toLowerCase() === author)
    .map(([isbn, book]) => ({ isbn, ...book }));

  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found for author: " + req.params.author });
  }
});

// Part D: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();

  const matchingBooks = Object.entries(books)
    .filter(([, book]) => book.title.toLowerCase().includes(title))
    .map(([isbn, book]) => ({ isbn, ...book }));

  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found with title: " + req.params.title });
  }
});

// Part D: Get book reviews by ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  }
});

module.exports.general = public_users;
