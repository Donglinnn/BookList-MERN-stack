import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

// Middleware for Routes of Books
app.use("/books", booksRoute);

// Route for Homepage
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome!");
});

// Connect to mongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connect to MongoDB...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
