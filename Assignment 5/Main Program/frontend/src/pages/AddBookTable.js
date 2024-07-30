import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MdOutlineDone } from "react-icons/md";



export const AddBookTable = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [maingenre, setMainGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [datestarted, setDateStarted] = useState('');
    const [dateended, setDateEnded] = useState('');
    const [loading, setLoading] = useState(false);
    
    const redirect = useNavigate();

    const addBook = async () => {
        const newBook = {  
            title,
            author,
            publisher,
            maingenre,
            language,
            datestarted,
            dateended
        };
        const response = await fetch('/books', {
            method: 'post',
            body: JSON.stringify(newBook),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`Your book has been successfully added to the library.`);
        } else {
            alert(`Error: Unable to add book to library due to missing information. = ${response.status}`);
        }
        redirect("/library");
    };


    return (
        <>
        <article>
        <h2>Add a Book</h2>
            <table className='library'>
                <caption>Book Details</caption>
                <tbody>
                    <tr>
                        <td><label htmlFor="title">Title*</label></td>
                        <td>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                placeholder="Book Title"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="author">Author*</label></td>
                        <td>
                            <input
                                type="text"
                                id="author"
                                value={author}
                                placeholder="Author Name"
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="publisher">Publisher</label></td>
                        <td>
                            <input
                                type="text"
                                id="publisher"
                                value={publisher}
                                placeholder="Publisher Name"
                                onChange={(e) => setPublisher(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="maingenre">Main Genre</label></td>
                        <td>
                            <input
                                type="text"
                                id="maingenre"
                                value={maingenre}
                                placeholder="Genre"
                                onChange={(e) => setMainGenre(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="language">Language</label></td>
                        <td>
                            <input
                                type="text"
                                id="language"
                                value={language}
                                placeholder="Language"
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="datestarted">Date Started</label></td>
                        <td>
                            <input
                                type="date"
                                id="datestarted"
                                value={datestarted}
                                min="2000-01-01"
                                max="2050-01-01"
                                onChange={(e) => setDateStarted(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="dateended">Date Ended</label></td>
                        <td>
                            <input
                                type="date"
                                id="dateended"
                                value={dateended}
                                min="2000-01-01"
                                max="2050-01-01"
                                onChange={(e) => setDateEnded(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                    <td colSpan="2">
                            <button
                                type="button"
                                onClick={addBook}
                                id="submit"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Book'}<MdOutlineDone />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button
                                type="button"
                                onClick={() => redirect(-1)}
                                id="go-back"
                            >Go Back</button>
                            </td>
                    </tr>
                </tbody>
            </table>
        </article>
    </>
);
}

export default AddBookTable;