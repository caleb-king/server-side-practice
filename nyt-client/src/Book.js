import React from 'react'

const Book = (props) => {
  
  const {title, rank, author, description} = props.bookData;
  const relevantBookData = {
    title,
    rank,
    author,
    description
  }
  
  return (
    <div className="book">
      {Object.keys(relevantBookData).map((key) => {
        return (
          <>
            <p className="book-property">
              <span className="book-key">{`${key}: `}</span>
              {relevantBookData[key]}
            </p>
          </>
        );
      })}
    </div>
  );
}

export default Book;