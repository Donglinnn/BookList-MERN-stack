import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Saving a New Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message:
          "Please send all required fields: title, author and publishYear.",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    // Wait for mongoose to create a newBook in database.
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Getting All Books from Database
router.get("/", async (req, res) => {
  try {
    // The variable books stands for all books inside database
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: e.message });
  }
});

// Route for Getting One Book by Id from Database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({ message: e.message });
  }
});

// Route for Updating a Book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author and publishYear.",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book successfully updated" });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

// Route for Deleting a Book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.deleteOne({ _id: id });

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book successfully deleted" });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
});

export default router;
