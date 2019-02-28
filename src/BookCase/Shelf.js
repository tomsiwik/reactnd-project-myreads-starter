import React from "react";

import { Books } from ".";

export const Shelf = ({ shelf, shelfName, books, ...props }) => {
  const booksInShelf = Object.values(books).filter(book => shelf.includes(book.id));

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ shelfName }</h2>
      <div className="bookshelf-books">
        <Books {...props} books={booksInShelf} />
      </div>
    </div>
  )
}
