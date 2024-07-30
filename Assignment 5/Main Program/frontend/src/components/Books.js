import React from 'react';


import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


function Book({ book, onEdit, onDelete }) {
    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.maingenre}</td>
            <td>{book.language}</td>
            <td>{book.datestarted ? book.datestarted.slice(0, 10) : ''}</td>
            <td>{book.dateended ? book.dateended.slice(0, 10) : ''}</td>

            {/* Update these icons to something that matches your style. */}
            <td><MdDeleteOutline onClick={() => onDelete(book._id)} /></td>
            <td><FaRegEdit onClick={() => onEdit(book)} /></td>
        </tr>
    );
}

export default Book;