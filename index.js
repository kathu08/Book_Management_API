require("dotenv").config();

// import express framework
const express = require("express");

// import mongoose framework
const mongoose = require("mongoose");

// import database
const database = require("./database/database");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initialization
const booky = express();

// Configuration
booky.use(express.json());

// establish Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established!!!!"));

/* 
Route         /
Description   Get all books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
booky.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/* 
Route         /is
Description   Get specific books based on ISBN
Access        PUBLIC
Parameter     ISBN
Methods       GET
*/
booky.get("/is/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecificBook) {
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
booky.get("/c/:category", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBook) {
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
booky.get("/l/:language", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    language: req.params.language,
  });

  if (!getSpecificBook) {
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
booky.get("/author", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });
});

/* 
Route         /author/id
Description   Get specific authors based on id
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/author/id/:aid", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({
    id: parseInt(req.params.aid),
  });

  if (!getSpecificAuthor) {
    return res.json({
      error: `No Author found for the ID of ${req.params.aid}`,
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
booky.get("/author/book/:isbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({
    books: req.params.isbn,
  });

  if (!getSpecificAuthor) {
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
booky.get("/publication", async (req, res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json({ publications: getAllPublication });
});

/* 
Route         /publication/id
Description   Get specific publication based on id
Access        PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/publications/id/:pid", async (req, res) => {
  const getSpecificPublications = await PublicationModel.findOne({
    id: parseInt(req.params.pid),
  });

  if (!getSpecificPublications) {
    return res.json({
      error: `No publication found for the PublicationID of ${req.params.pid}`,
    });
  }

  return res.json({ publications: getSpecificPublications });
});

/* 
Route         /publication/book
Description   Get all publication based on books
Access        PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/publications/books/:isbn", async (req, res) => {
  const getSpecificPublications = await PublicationModel.findOne({
    books: req.params.isbn,
  });

  if (!getSpecificPublications) {
    return res.json({
      error: `No publications found based on ${req.params.isbn}`,
    });
  }

  return res.json({ publications: getSpecificPublications });
});

/* 
Route         /book/add
Description   Add new book
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/book/add", async (req, res) => {
  const { newBook } = req.body;
  BookModel.create(newBook);

  return res.json({ message: "added new book" });
});

/* 
Route         /author/add
Description   Add new author
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/author/add", async (req, res) => {
  const { newAuthor } = req.body;
  AuthorModel.create(newAuthor);

  return res.json({ message: "Added new author!" });
});

/* 
Route         /book/update/title
Description   Update book title
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/title/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true,
    }
  );

  return res.json({ books: updatedBook });
});

/* 
Route         /book/update/author
Description   Update or add new author for a book
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/author/:isbn", async (req, res) => {
  // update book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: { author: req.body.newAuthor },
    },
    {
      new: true,
    }
  );

  // update author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );
  // database.author.forEach((author) => {
  //   if (author.id === parseInt(req.params.authorId)) {
  //     return author.books.push(req.params.isbn);
  //   }
  // });

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
booky.post("/publication/add", async (req, res) => {
  const { newPublication } = req.body;
  PublicationModel.create(newPublication);

  return res.json({ message: "added new publication" });
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

/* 
Route         /book/delete
Description   Delete a book
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
booky.delete("/book/delete/:isbn", async (req, res) => {
  const updateBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });

  return res.json({ books: updateBookDatabase });
});

/* 
Route         /book/delete/author
Description   Delete an author of a book
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {
  // update book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        author: parseInt(req.params.authorId),
      },
    },
    {
      new: true,
    }
  );

  //update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(req.params.authorId),
    },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    books: updatedBook,
    message: "author deleted",
    author: updatedAuthor,
  });
});

/* 
Route         /author/delete
Description   Delete an author
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
booky.delete("/author/delete/:id", (req, res) => {
  const updatedAuthorDatabase = database.author.filter(
    (author) => author.id !== parseInt(req.params.id)
  );

  database.author = updatedAuthorDatabase;
  return res.json({ author: database.author });
});

/* 
Route         /publication/delete
Description   Delete a publication
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
booky.delete("/publication/delete/:id", (req, res) => {
  const updatedPublicationDatabase = database.publication.filter(
    (publication) => publication.id !== parseInt(req.params.id)
  );

  database.publication = updatedPublicationDatabase;
  return res.json({ publication: database.publication });
});

/* 
Route         /publication/delete/book
Description   Delete a book from a publication
Access        PUBLIC
Parameter     isbn, pubid
Methods       DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  //update publication database
  database.publication.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBookList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBookList;
      return;
    }
  });

  //update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publication,
  });
});

booky.listen(3000, () => console.log("Hey server is running!"));
