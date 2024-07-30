import React from 'react';
import Book from './Books';



function BookList({ books, onDelete, onEdit }) {
    return (
        <table id="books">
            <caption>Add Book Details</caption>
            <thead>
                <tr>
                <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Main Genre</th>
                    <th>Language</th>
                    <th>Date Started</th>
                    <th>Date Ended</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, i) => 
                    <Book 
                        book={book} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </tbody>
        </table>
    );
}

export default BookList;
