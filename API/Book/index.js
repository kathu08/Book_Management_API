// Prefix : /book

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/book");

/* 
Route         /
Description   Get all books
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/", async (req, res) => {
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
Router.get("/is/:isbn", async (req, res) => {
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
Router.get("/c/:category", async (req, res) => {
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
Router.get("/l/:language", async (req, res) => {
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
Route         /book/add
Description   Add new book
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async (req, res) => {
  try {
    const { newBook } = req.body;
    await BookModel.create(newBook);

    return res.json({ message: "added new book" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/* 
Route         /book/update/title
Description   Update book title
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
Router.put("/book/update/title/:isbn", async (req, res) => {
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
Router.put("/update/author/:isbn", async (req, res) => {
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

  return res.json({ books: database.books, author: database.author });
});

/* 
Route         /book/delete
Description   Delete a book
Access        PUBLIC
Parameter     isbn
Methods       DELETE
*/
Router.delete("/delete/:isbn", async (req, res) => {
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
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
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

module.exports = Router;
