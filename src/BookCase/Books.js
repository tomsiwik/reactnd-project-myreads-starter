import React from "react";

import { Book } from ".";

export const Books = ({ books, ...props }) => {
  return (
    <ol className="books-grid">
        { 
          books.map( book => 
            (
              <li key={book.id} >
                <Book {...props} book={book} books={books} />
              </li>
            )
          ) 
        }
      </ol>
  )
}