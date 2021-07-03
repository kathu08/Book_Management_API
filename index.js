require("dotenv").config();

// import express framework
const express = require("express");

// import mongoose framework
const mongoose = require("mongoose");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

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

// Initializing microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);

booky.listen(3000, () => console.log("Hey server is running!"));
