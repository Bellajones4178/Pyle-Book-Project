import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MdOutlineDone } from "react-icons/md";




export const EditBookTable = ({ bookToEdit }) => {

    const [title, setTitle] = useState(bookToEdit.title);
    const [author, setAuthor] = useState(bookToEdit.author);
    const [publisher, setPublisher] = useState(bookToEdit.publisher);
    const [maingenre, setMainGenre] = useState(bookToEdit.maingenre);
    const [language, setLanguage] = useState(bookToEdit.language);
    const [datestarted, setDateStarted] = useState(bookToEdit.datestarted);
    const [dateended, setDateEnded] = useState(bookToEdit.dateended);
    const [loading, setLoading] = useState(false);

    const redirect = useNavigate();

    const editBook = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/book/${bookToEdit._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: title,
                    author: author,
                    publisher: publisher,
                    maingenre: maingenre,
                    language: language,
                    datestarted: datestarted,
                    dateended: dateended,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                alert(`Book information updated successfully!`);
                redirect('/library');
            } else {
                const errMessage = await response.json();
                alert(`Error: Unable to edit book due to missing information. ${response.status}. ${errMessage.Error}`);
            }
        } catch (error) {
            alert(`Error: Unable to edit book. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <article>
            <h2>Edit Book Details</h2>
            <h5>Edit the form below to update book details.</h5>
            <table>
                <caption>Book Details<br></br>
                *Required Elements</caption>
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
                                onClick={editBook}
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
    );
};

export default EditBookTable;