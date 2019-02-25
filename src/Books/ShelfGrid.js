import React, { Component } from "react";

import { Book } from ".";

export class ShelfGrid extends Component {
  render() {
    const { books, ...props } = this.props;
    const [ shelf ] = props.shelf;

    const booksInShelf = books.filter(book => book.shelf === shelf);

    return (
      <ol className="books-grid">
        { 
          booksInShelf.map( book => 
            (
              <li key={book.id} >
                <Book {...props} book={book} />
              </li>
            )
          ) 
        }
      </ol>
    )
  }
}

export default ShelfGrid
