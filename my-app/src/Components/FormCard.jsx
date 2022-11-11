import React, { useRef } from 'react'

export default function AddNewBook( {setBooks, editBook} ) {
    const isbnRef = useRef();
    const titleRef = useRef();
    const authorRef = useRef();
    const categoriesRef = useRef();
    const languageRef = useRef();
    const descriptionRef = useRef();
    const dateRef = useRef();
    const ratingRef = useRef();
    
    const handleAddBook = (event) => {
    event.preventDefault();
    const isbn = isbnRef.current.value;
    const title = titleRef.current.value;
    const author = authorRef.current.value;
    const categories = categoriesRef.current.value;
    const language = languageRef.current.value;
    const description = descriptionRef.current.value;
    const date = dateRef.current.value;
    const rating = ratingRef.current.value;

    if ((title && author &&language && date && rating) === '') {
        alert("Please fill all fields marked with an *")
        return;
    } else
    
    setBooks(prevBooks => [...prevBooks, {
        id: Date.now(), 
        isbn: isbn,
        title: title,
        author: author,
        categories: categories,
        language: language,
        description: description,
        date: date,
        rating: rating,
    }]);
    
    inputIsbn.current.value = null;
    isbnRef.current.value = null;
    titleRef.current.value = null;     
    authorRef.current.value = null;     
    categoriesRef.current.value = null;     
    languageRef.current.value = null;     
    descriptionRef.current.value = null;     
    dateRef.current.value = null;     
    ratingRef.current.value = null;
    }

// API
const inputIsbn = useRef();

const handleClick = (event) => {
  event.preventDefault();
  getBookInfo(inputIsbn.current.value);
}

  const updateBookData = (bookData) => {
      if (bookData.totalItems === 0) {
          alert('not found!');
          return;
      }
      const bookInfo = bookData.items[0].volumeInfo;
      isbnRef.current.value = inputIsbn.current.value;
      titleRef.current.value = bookInfo.title;
      authorRef.current.value = bookInfo.authors.join('; ');
      categoriesRef.current.value = bookInfo.categories.join('; ');
      languageRef.current.value = bookInfo.language;
      descriptionRef.current.value = bookInfo.description;

      // categoriesInput.value = bookData.items[0].volumeInfo.categories.join('; ');
      // languageInput.value = bookData.items[0].volumeInfo.language;
      // descriptionInput.value = bookData.items[0].volumeInfo.description;
  }
  
  const getBookInfo = (isbn) => {
    if (isbn === '') return;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
          .then(response => {
              if (response.ok) return response.json();
              else return Promise.reject(response);
          })
          .then(text => {
              updateBookData(text);
          })
  }
//API

    return (
    <div className="formCard">
        <h1 className="formTitle">Book Tracker</h1>
        <p className="formText">The app to keep track of the books you've read</p>
        <form>
        <label>ISBN (optional)</label>
       <input ref={inputIsbn} type="text" name="isbn" className="inputField" id="newBookISBN" placeholder="Type the ISBN to have Title and Author filled for you" />
       <div className="buttonDiv">
       <button onClick={handleClick} className="isbnButton">Get Book Info</button>
       </div>
      </form>

        <form id="newBookForm">
            <input name="isbnHidden" type="hidden" ref={isbnRef} className="inputField" id="newBookIsbnHidden" />
            <label>Title*</label>
            <input name="title" type="text" ref={titleRef} className="inputField" id="newBookTitle" placeholder="Type the title of the book" />
            <label>Author(s)*</label>
            <input name="author" type="text" ref={authorRef} className="inputField" id="newBookAuthor" placeholder="Type the author's name" />
            
            <label>Categories (optional) </label>
            <input name="categories" type="text" ref={categoriesRef} className="inputField" id="categories" placeholder="Type the categories" />
            
            <label>Language*</label>
            <input name="language" type="text" ref={languageRef} className="inputField" id="language" placeholder="Type the language" />

            <label>Description (optional)</label>
            <textarea name="Description" type="text" ref={descriptionRef} className="inputField" id="newBookDescription" placeholder="Type your summary and comments" />

            <label>Date*</label>
            <input name="date" type="text" ref={dateRef} className="inputField" id="newBookDate" placeholder="Date you finished reading it" />
            <label>Rating*</label>
            <input name="rating" type="text" ref={ratingRef} className="inputField" id="newBookRate" placeholder="Rate the book" />
            
            <div className="buttonDiv">
            <button onClick={handleAddBook} className="addButton">Add book</button>
            </div>
        </form>
    </div>
  )
}