/**
 * Part E: Async/Await and Promises with Axios
 *
 * This file demonstrates four async CRUD operations against the local
 * book-review server (http://localhost:5000) using axios:
 *
 *  Task 1 – Get all books              → async/await
 *  Task 2 – Get book by ISBN           → Promise (.then / .catch)
 *  Task 3 – Get books by Author        → Promise (.then / .catch)
 *  Task 4 – Get books by Title         → Promise (.then / .catch)
 *
 * Run with:  node async_operations.js
 * (the Express server must already be running on port 5000)
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// ─────────────────────────────────────────────────────────────────────────────
// Task 1: Get ALL books using async / await
// ─────────────────────────────────────────────────────────────────────────────
const getAllBooks = async () => {
  console.log('\n=== Task 1: Get All Books (async/await) ===');
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('All Books:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching all books:', error.message);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Task 2: Get book by ISBN using a Promise (.then / .catch)
// ─────────────────────────────────────────────────────────────────────────────
const getBookByISBN = (isbn) => {
  console.log(`\n=== Task 2: Get Book by ISBN "${isbn}" (Promise) ===`);
  return axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      console.log('Book details:');
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
    });
};

// ─────────────────────────────────────────────────────────────────────────────
// Task 3: Get books by Author using a Promise (.then / .catch)
// ─────────────────────────────────────────────────────────────────────────────
const getBooksByAuthor = (author) => {
  console.log(`\n=== Task 3: Get Books by Author "${author}" (Promise) ===`);
  return axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`)
    .then(response => {
      console.log('Books by author:');
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching books by author "${author}":`, error.message);
    });
};

// ─────────────────────────────────────────────────────────────────────────────
// Task 4: Get books by Title using a Promise (.then / .catch)
// ─────────────────────────────────────────────────────────────────────────────
const getBooksByTitle = (title) => {
  console.log(`\n=== Task 4: Get Books by Title "${title}" (Promise) ===`);
  return axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
    .then(response => {
      console.log('Books by title:');
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch(error => {
      console.error(`Error fetching books by title "${title}":`, error.message);
    });
};

// ─────────────────────────────────────────────────────────────────────────────
// Run all four tasks sequentially
// ─────────────────────────────────────────────────────────────────────────────
(async () => {
  // Task 1 – async/await
  await getAllBooks();

  // Task 2 – Promise: look up book with ISBN 1
  await getBookByISBN(1);

  // Task 3 – Promise: find all books by "Jane Austen"
  await getBooksByAuthor('Jane Austen');

  // Task 4 – Promise: find books whose title contains "Things"
  await getBooksByTitle('Things Fall Apart');

  console.log('\nAll async operations completed.');
})();
