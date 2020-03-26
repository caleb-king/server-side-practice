import React from 'react';
import Book from './Book';

const BooksDisplay = (props) => {
  return (
    <section
      className="books-display">
        {props.books && props.books.map((bookData) => {
          return (
            <Book 
              bookData={bookData}
              key={bookData.id}>
            </Book>);
        })}
    </section>
  );
}

export default BooksDisplay;