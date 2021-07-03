// Prefix : /author

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const AuthorModel = require("../../database/author");

/* 
Route         /author
Description   Get all authors
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/", async (req, res) => {
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
Router.get("/id/:aid", async (req, res) => {
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
Router.get("/book/:isbn", async (req, res) => {
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
Route         /author/add
Description   Add new author
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async (req, res) => {
  const { newAuthor } = req.body;
  AuthorModel.create(newAuthor);

  return res.json({ message: "Added new author!" });
});

/* 
Route         /author/update/name
Description   Update author name using id
Access        PUBLIC
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async (req, res) => {
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    { id: parseInt(req.params.id) },
    { name: req.body.newAuthorName },
    { new: true } //to get updated data
  );

  return res.json({ authors: updatedAuthor });
});

/* 
Route         /author/delete
Description   Delete an author
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id", async (req, res) => {
  const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
    id: parseInt(req.params.id),
  });
  return res.json({ Authors: updatedAuthorDatabase });
});

module.exports = Router;
