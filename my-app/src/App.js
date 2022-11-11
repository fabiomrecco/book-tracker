import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './Components/BookList';
import FormCard from './Components/FormCard';

const Local_Storage_Key = 'bookApp.books'

const App = () => {
  const [books, setBooks] = useState ([])

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem(Local_Storage_Key))
    if (storedBooks) setBooks(storedBooks)
  }, [])

  useEffect(() => {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(books))
}, [books]);

const removeBook = (id) => {
  const allBooks = [...books];
  const book = allBooks.find(book => book.id === id);
  const index = allBooks.findIndex(el => el.id === parseInt(book.id));
  allBooks.splice(index, 1);
  setBooks(allBooks);
}

// const editBook = (id) => {
//   const allBooks = [...books];
//   const book = allBooks.find(book => book.id === id);
//   const index = allBooks.findIndex(el => el.id === parseInt(book.id));
  
//   isbnRef.current.value = book.isbn;

//   setBooks(allBooks);
// }

  return (
    <div>
    <FormCard setBooks={setBooks}  />
    <BookList books={books} removeBook={removeBook} />
    </div>
  )
};

export default App;
