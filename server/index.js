import express from "express";
import "./db/db.js";
import "dotenv/config";
import cors from "cors";
import bookSchema from "./models/bookSchema.js";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const book = await bookSchema.find({});
    if (!book) {
      return res.status(404).send({ message: "Book  not found" });
    }
    res.json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    //validate first
    const currentYear = new Date().getFullYear();
    const inputYear = req.body.publishYear;
    if (inputYear > currentYear) {
      return res
        .status(400)
        .send({ message: "Year should not be more than the current year." });
    }
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.note
    ) {
      return res.status(400).send({ message: "Send all required fields" });
    }
    //create new book schema
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      note: req.body.note,
    };
    //create new book and save
    const book = await bookSchema.create(newBook);
    // send status(200) and send book
    return res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//get single book
app.get("/books/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await bookSchema.findById(id);
    if (!book) {
      return res.status(400).send({ message: "No content found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//update
app.put("/books/:id", async (req, res) => {
  const currentYear = new Date().getFullYear();
  const inputYear = req.body.publishYear;
  if (inputYear > currentYear) {
    return res
      .status(400)
      .send({ message: "Year should not be more than the current year." });
  }

  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.note
    ) {
      return res.status(400).send({ message: "Send all required fields" });
    }
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    // send result desturcture the id
    const result = await bookSchema.findByIdAndUpdate({ _id: id });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    //send result which is lso 200
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete
app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }
    const result = await bookSchema.findByIdAndDelete({ _id: id });
    if (!result) {
      return res.status(404).json({ message: "Book Not Found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("OK...my message");
});

app.listen(process.env.PORT, () =>
  console.log("server listening on port " + process.env.PORT)
);
