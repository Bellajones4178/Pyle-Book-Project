// Controllers for the Book Collection

import 'dotenv/config';
import express from 'express';
import * as books from './books-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/books', (req,res) => { 
    books.createBook(
        req.body.title,
        req.body.author,
        req.body.publisher,
        req.body.maingenre,
        req.body.language,
        req.body.datestarted,
        req.body.dateended
        )
        .then(book => {
            console.log(`"${book.type}" was successfully added to the online database.`);
            res.status(201).json(book);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Your input was not added to the database and is missing some important information. Please try again.' });
        });
});


// RETRIEVE controller ****************************************************
app.get('/books', (req, res) => {
    books.retrieveBooks()
        .then(books => { 
            if (books !== null) {
                console.log(`All planes were retrieved from the plane database.`);
                res.json(books);
            } else {
                res.status(404).json({ Error: 'The plane you are requesting is not present in the database. Please try again.' });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'We were unable to retrieve the information from the database as it is missing important information. Please try again.' });
        });
});


// RETRIEVE by ID controller
app.get('/books/:_id', (req, res) => {
    books.retrieveBookByID(req.params._id)
    .then(book => { 
        if (book !== null) {
            console.log(`"${book.type}" was retrieved from the database based on its unique ID.`);
            res.json(book);
        } else {
            res.status(404).json({ Error: 'We are unable to retrieve your plane request as it is not present in the database. Please try again.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'We were unable to retrieve the information from the database as it is missing important information. Please try again.' });
    });

});


// UPDATE controller ************************************
app.put('/book/:_id', (req, res) => {
    books.updateBook(
        req.params._id, 
        req.body.title,
        req.body.author,
        req.body.publisher,
        req.body.maingenre,
        req.body.language,
        req.body.datestarted,
        req.body.dateended
    )
    .then(book => {
        console.log(`"${book.type}" was successfully updated in the database.`);
        res.json(book);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'We were unable to update the information from the database as it is missing important information. Please try again.' });
    });
});


// DELETE Controller ******************************
app.delete('/books/:_id', (req, res) => {
    books.deleteBookById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`The plane ${deletedCount}, was successfully deleted from the database.`);
                res.status(200).send({ Success: 'The database has been successfully updated, with your request deleted.' });
            } else {
                res.status(404).json({ Error: 'We are unable to delete your plane request as it is not listed in the database. Please try again.' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'We are unable to delete your plane request as it is missing important information. Please try again.' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});