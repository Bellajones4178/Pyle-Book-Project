// Models for the Book Collection

import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;


db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'You have not connected to the database.' });
    } else  {
        console.log('Success: You have connected to the database.');
    }
});

// SCHEMA: Define the collection's schema.
const bookSchema = mongoose.Schema({
	title:    { type: String, required: true },
	author:     { type: String, required: true },
	publisher: { type: String },
    maingenre: { type: String },
    language: { type: String },
    datestarted: { type: Date, default: Date.now },
    dateended: { type: Date, default: Date.now },
});


const books = mongoose.model('books', bookSchema);


// CREATE model *****************************************
const createBook = async (title, author, publisher, maingenre, language, datestarted, dateended) => {
    const book = new books({ 
        title: title, 
        author: author, 
        publisher: publisher,
        maingenre: maingenre,
        language: language,
        datestarted: datestarted,
        dateended: dateended
    });
    return book.save();
}


// RETRIEVE model *****************************************
const retrieveBooks = async () => {
    const query = books.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveBookByID = async (_id) => {
    const query = books.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteBookById = async (_id) => {
    const result = await books.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateBook = async (_id, title, author, publisher, maingenre, language, datestarted, dateended) => {
    const result = await books.replaceOne({_id: _id }, {
        title: title, 
        author: author, 
        publisher: publisher,
        maingenre: maingenre,
        language: language,
        datestarted: datestarted,
        dateended: dateended
    });
    return { 
        _id: _id, 
        title: title, 
        author: author, 
        publisher: publisher,
        maingenre: maingenre,
        language: language,
        datestarted: datestarted,
        dateended: dateended
    }
}

// EXPORT 
export { createBook, retrieveBooks, retrieveBookByID, updateBook, deleteBookById }