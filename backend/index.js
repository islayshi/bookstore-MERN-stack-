import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Route for new saved book 
app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to MERN Stack Tutorial")
});

app.post("/books", async (request, response) => {
    try{
        if (!request.body.title ||!request.body.author || !request.body.yearPublished){
                return response.status(400).send({
                    message: "Send all required fields: title, author, yearPublished", 
                });
            }
    
    const newBook = {
        title: request.body.title,
        author: request.body.author,
        yearPublished: request.body.yearPublished,
    };        
    
    //new book variable 
    const book = await Book.create(newBook);

    // send the book to the client
    return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message });
    } 
});


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error) => 
    {
        console.log(error);
    })