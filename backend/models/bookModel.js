import mongoose from "mongoose";

//no need for ID parameter, it'll be handled by mongodb
const bookSchema = mongoose.Schema (
    {
        title: {
            type : String,
            required : true,

        },
        author: {
            type : String,
            required : true,

        },
        yearPublished: {
            type : Number,
            required : true,

        },
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Cat', bookSchema);