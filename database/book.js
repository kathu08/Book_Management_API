const mongoose = require("mongoose");

// creating a book schema
const BookSchema = mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 10,
  },
  title: {
    type: String,
    required: true,
  },
  pubDate: String,
  language: {
    type: String,
    required: true,
  },
  numPage: {
    type: Number,
    required: true,
  },
  author: [Number],
  publication: Number,
  category: [String],
});

// create a book model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
