import React, { Component } from "react";

import { Books } from ".";

export class Shelf extends Component {
  render() {
    const { shelf, books } = this.props;

    const shelvedBooks = books.filter(book => shelf.books.includes(book.id));
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelf.title }</h2>
        <div className="bookshelf-books">
          <Books {...this.props} books={shelvedBooks} />
        </div>
      </div>
    )
  }
}

export default Shelf
