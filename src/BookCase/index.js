import React from "react";
import { Link } from "react-router-dom";

import { Shelf } from "./Shelf";

export { Books } from "./Books";
export { ShelfOptions } from "./ShelfOptions";
export { Book } from "./Book";

export default function BookCase(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads - by Tom</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            Object.entries(props.shelfNames).map(([id, shelfName]) => {
              return (
                <Shelf {...props} key={id} shelf={props.shelves[id]} shelfName={shelfName} />
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