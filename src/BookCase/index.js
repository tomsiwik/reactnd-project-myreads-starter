import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Shelf } from "./Shelf";

export { Books } from "./Books";
export { ShelfOptions } from "./ShelfOptions";
export { Book } from "./Book";

export default class BookCase extends Component{
  render(){
    const { shelves, ...props } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads - by Tom</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              Object.entries(shelves).map((shelf) => {
                const [ name, content ] = shelf;

                return (
                  <Shelf key={name} shelf={content} shelves={shelves} {...props} />
                )
              })
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="button">Add a book</Link>
        </div>
      </div>
    )
  }
}