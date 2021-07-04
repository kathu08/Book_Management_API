// Prefix : /publication

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const PublicationModel = require("../../database/publication");

/* 
Route         /publication
Description   Get all publications
Access        PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/", async (req, res) => {
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
Router.get("/id/:pid", async (req, res) => {
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
Router.get("/books/:isbn", async (req, res) => {
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
Route         /publication/add
Description   Add new publication
Access        PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async (req, res) => {
  try {
    const { newPublication } = req.body;
    await PublicationModel.create(newPublication);

    return res.json({ message: "added new publication" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/* 
Route         /publication/update/name
Description   Update publication name using id
Access        PUBLIC
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async (req, res) => {
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    { id: parseInt(req.params.id) },
    { name: req.body.newPublicationName },
    { new: true } //to get updated data
  );

  return res.json({ publications: updatedPublication });
});

/* 
Route         /publication/update/book
Description   Update or add new book for a publication
Access        PUBLIC
Parameter     isbn
Methods       PUT
*/
Router.put("/update/book/:isbn", async (req, res) => {
  //update the publication database
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    { id: req.body.pubId },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );

  //updating books database
  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: req.params.isbn },
    {
      $addToSet: {
        publications: req.body.pubId,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    books: updateBook,
    publications: updatedPublication,
    message: "Successfully updated publication",
  });
});

/* 
Route         /publication/delete
Description   Delete a publication
Access        PUBLIC
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id", async (req, res) => {
  const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({
    id: parseInt(req.params.id),
  });
  return res.json({ Publications: updatedPublicationDatabase });
});

/* 
Route         /publication/delete/book
Description   Delete a book from a publication
Access        PUBLIC
Parameter     isbn, pubid
Methods       DELETE
*/
Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {
  //updating publication database
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    { id: parseInt(req.params.pubId) },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );

  //update book database
  const updatedBook = await BookModel.findOneAndUpdate(
    { ISBN: req.params.isbn },
    {
      $pull: {
        publications: parseInt(req.params.pubId),
      },
    },
    {
      new: true,
    }
  );

  return res.json({ books: updatedBook, publications: updatedPublication });
});

module.exports = Router;
