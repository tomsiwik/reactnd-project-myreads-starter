import React, { Component } from "react";

import { ShelfGrid } from ".";

export class Shelf extends Component {
  render() {
    const { title, ...props } = this.props;
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ShelfGrid {...props} />
        </div>
      </div>
    )
  }
}

export default Shelf
