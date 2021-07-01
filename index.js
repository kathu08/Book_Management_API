// setup express project
const express = require("express");

// Database'
const database = require("./database");

// Initialization
const booky = express();

// Configuration
booky.use(express.json());

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

/* 
Route         /book/add
Description   Add new book
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/book/add", (req, res) => {
  const { newBook } = req.body;

  database.books.push(newBook);
  return res.json({ books: database.books });
});

/* 
Route         /author/add
Description   Add new author
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;

  database.author.push(newAuthor);
  return res.json({ authors: database.author });
});

/* 
Route         /book/update/title
Description   Update book title
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.newBookTitle;
      return;
    }
  });

  return res.json({ books: database.books });
});

/* 
Route         /book/update/author
Description   Update or add new author for a book
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorId));
    }
  });

  // update author database
  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      return author.books.push(req.params.isbn);
    }
  });

  return res.json({ books: database.books, author: database.author });
});

/* 
Route         /author/update/name
Description   Update author name using id
Access        PUBLIC
Parameter     id
Methods       PUT
*/
booky.put("/author/update/name/:id", (req, res) => {
  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.id)) {
      author.name = req.body.newAuthorName;
      return;
    }
  });

  return res.json({ authors: database.author });
});

/* 
Route         /publication/add
Description   Add new publication
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/publication/add", (req, res) => {
  const { newPublication } = req.body;

  database.publication.push(newPublication);
  return res.json({ publication: database.publication });
});

/* 
Route         /publication/update/name
Description   Update publication name using id
Access        PUBLIC
Parameter     id
Methods       PUT
*/
booky.put("/publication/update/name/:id", (req, res) => {
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.id)) {
      publication.name = req.body.newPublicationName;
      return;
    }
  });

  return res.json({ publication: database.publication });
});

/* 
Route         /publication/update/book
Description   Update or add new book for a publication
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
  // update publication database
  database.publication.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publications = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
    message: "Successfully updated publication",
  });
});

booky.listen(3000, () => console.log("Hey server is running!"));
