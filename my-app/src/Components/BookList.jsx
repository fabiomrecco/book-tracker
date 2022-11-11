import React from 'react'
import Book from  './Book';

export default function BookList({ books, removeBook, editBook }) {
  return (
   books.map(book => {
    return <Book key={book.id} book={book} editBook={editBook} removeBook={removeBook} />
   })
  )
}