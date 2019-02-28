import React from "react";

import { Book } from ".";

export const Books = ({ books, ...props }) => {
  return (
    <ol className="books-grid">
        { 
          Object.entries(books).map( ([id, book]) => 
            (
              <li key={id} >
                <Book {...props} book={book} />
              </li>
            )
          ) 
        }
      </ol>
  )
}