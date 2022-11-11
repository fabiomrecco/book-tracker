import React from 'react'

export default function Book({ book, editBook, removeBook }) {
const handleRemoveClick = (event) => {
    event.stopPropagation();
    removeBook(book.id);
}

const handleEditClick = (event) => {
    event.stopPropagation();
    editBook(book.id);
}

return (
    <section className="bookCard">
        <p className="bookTitle">{book.title}</p>
        <p className="bookAuthor">{book.author}</p>
        <p className="bookIsbn"><span className="outputLabel">ISBN:</span> {book.isbn}</p>
        <p className="bookCategories"><span className="outputLabel">Categories:</span> {book.categories}</p>
        <p className="bookLanguage"><span className="outputLabel">Language:</span> {book.language}</p>
        <p className="bookDescription"><span>Description: </span> {book.description}</p>
        <p className="bookDate"><span className="outputLabel">Date finished:</span> {book.date}</p>
        <p className="bookRating"><span className="outputLabel">Your rating:</span> {book.rating}</p>
       
        <div className="buttonDiv">
        <button className="editButton" onClick={handleEditClick}>Edit</button>
        <button className="removeButton" onClick={handleRemoveClick}>Remove</button>
        </div>
    </section>
  )
}