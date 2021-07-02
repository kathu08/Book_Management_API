let books = [
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
  {
    ISBN: "12345New",
    title: "Getting started with MERN Stack",
    pubDate: "2021-07-08",
    language: "en",
    numPage: 250,
    author: [1, 2], // id of the author
    publications: [1, 2],
    category: ["tech", "programming", "education"],
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
    },
    {
        id: 2,
        name: "codex",
        books: ["12345New"],
    }
];

// allow javascript to export this file
module.exports = {books, author, publication};