import express from "express";
import { Book } from "../models/bookModel.js";
import cors from "cors";

const router = express.Router();

// find and send all books
router.get("/", async (req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log("enter catch block")
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// find and send a single book by id
router.get("/:id", async (req,res) => {

    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// update existing book
router.put("/:id", async (req,res) => {
    try {
        // if one input field is missing return status 400
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "Send all input fields: title, author, year of publication"});
        }
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id,req.body);
        // if the book is updated successfully
        if (result) {
            return res.status(200).send({message : "Book successfully updated"});
        } else {
            res.status(404).send({message:"Book not found"});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// add new record of a book
router.post("/", async (req,res) => {

    try {
        // if one input field is missing return status 400
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({message: "Send all input fields: title, author, year of publication"});
        }
        // create new book document
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);

        res.status(201).json(book)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// delete a book
router.delete("/:id", async (req,res) => {
    try {

        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);
        // if the book is updated successfully
        if (result) {
            return res.status(200).send({message : "Book successfully deleted"});
        } else {
            res.status(404).send({message:"Book not found"});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// router.use(cors());


export default router;