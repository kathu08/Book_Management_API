const books = [
  {
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1, 2], // id of the author
    publications: [1],
    category: ["tech", "programming", "education", "thriller"],
  },
];

const author = [
  {
    id: 1,
    name: "Pavan",
    books: ["12345Book", "123456789Secret"],
  },
  {
    id: 2,
    name: "Elon Musk",
    books: ["12345Book"],
  },
];

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"],
    }
];

// allow javascript to export this file
module.exports = {books, author, publication};