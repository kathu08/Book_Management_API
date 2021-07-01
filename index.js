// setup express project
const express = require("express");

// Database'
const database = require("./database");

// Initialization
const booky = express();

/* 
Route         /
Description   Get all books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/* 
Route         /is
Description   Get specific books based on ISBN
Access        PUBLIC
Parameter     ISBN
Methods       GET
*/
booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/* 
Route         /c
Description   Get specific books based on category
Access        PUBLIC
Parameter     category
Methods       GET
*/
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/* 
Route         /l
Description   Get specific books based on language
Access        PUBLIC
Parameter     language
Methods       GET
*/
booky.get("/l/:language", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.language.includes(req.params.language)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the language of ${req.params.language}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/* 
Route         /author
Description   Get all authors
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/author", (req, res) => {
  return res.json({ authors: database.author });
});

/* 
Route         /author/id
Description   Get specific authors based on id
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/author/id/:id", (req, res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the ID of ${req.params.id}`,
    });
  }

  return res.json({ author: getSpecificAuthor });
});

/* 
Route         /author/book
Description   Get all authors based on books
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificAuthor });
});

/* 
Route         /publication
Description   Get all publications
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/publication", (req, res) => {
  return res.json({ publications: database.publication });
});

/* 
Route         /publication/id
Description   Get specific publication based on id
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/publication/id/:id", (req, res) => {
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.id === parseInt(req.params.id)
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No Publication found for the id of ${req.params.id}`,
    });
  }

  return res.json({ publication: getSpecificPublication });
});

/* 
Route         /publication/book
Description   Get all publication based on books
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/publication/book/:isbn", (req, res) => {
  const getSpecificPublication = database.publication.filter((publication) =>
    publication.books.includes(req.params.isbn)
  );

  if (getSpecificPublication.length === 0) {
    return res.json({
      error: `No Publication found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificPublication });
});

booky.listen(3000, () => console.log("Hey server is running!"));
