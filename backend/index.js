import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
//app.use(express.json());
// Middle ware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: allow custom origins (better way)
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Route for new saved book 
app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to MERN Stack Tutorial")
});

app.use('/books', booksRoute);

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