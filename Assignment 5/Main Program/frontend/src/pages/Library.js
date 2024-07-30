import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BookList from '../components/BookList';
import { Link } from 'react-router-dom';
import { LuBookPlus } from "react-icons/lu";

function Library({ setBook }) {
    
    const redirect = useNavigate();

    const [books, setBooks] = useState([]);

    const loadBooks = async () => {
        const response = await fetch('/books');
        const books = await response.json();
        setBooks(books);
    } 

    const onEditBook = async book => {
        setBook(book);
        redirect("/update");
    }
  
    const onDeleteBook = async _id => {
        if (window.confirm('Are you sure you want to delete this book? This will be permanently deleted.')) {
            const response = await fetch(`/books/${_id}`, { method: 'DELETE' });
            if (response.status === 200) {
                const getResponse = await fetch('/books');
                const books = await getResponse.json();
                setBooks(books);
            } else {
                console.error(`Failed to delete book. ID = ${_id}, status code = ${response.status}`);
            }
        }
    }


    useEffect(() => {
        loadBooks();
    }, []);


    return (
        <>
            <h3>Welcome to the library! You can add, remove, and edit books directly from this page.</h3>

            <BookList 
                books={books} 
                onEdit={onEditBook} 
                onDelete={onDeleteBook} 
            />
            <section className='center'>
                <LuBookPlus /><Link to="/create">Add a Book</Link>
            </section>
        </>
    );
}

export default Library;