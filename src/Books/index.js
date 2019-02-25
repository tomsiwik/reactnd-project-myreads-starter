import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Shelf } from "./Shelf";

export { ShelfGrid } from "./ShelfGrid";
export { ShelfOptions } from "./ShelfOptions";
export { Book } from "./Book";

export default class Books extends Component{
  render(){
    const { ...props } = this.props;
    const { shelves } = props;

    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads - by Tom</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            shelves.map((shelf) => {
              const [ name, title ] = shelf;
              return (
              <Shelf key={name} title={title} shelf={shelf} {...props} />
            )})
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