import React, { Component } from "react";

import { ShelfOptions } from ".";

export class Book extends Component {
  state = {
    width: 140,
    height: 200,
    cover: ""
  }

  /**
   * Handles thumbnail sizes
   */
  componentDidMount(){
    const { book: { imageLinks: { thumbnail } } } = this.props;

    const img = new Image();
    img.src = thumbnail;

    img.onload = () => {
      this.setState({
        width: img.width,
        height: img.height,
        cover: thumbnail
      })
    }
  }

  /**
   * Switching shelves book in fact needs to know
   * which book was switch. This component already
   * know into which shelf should be switched.
   */
  handleMoveShelf = (shelf) => {
    const { onMoveShelf, book } = this.props;
    onMoveShelf(book, shelf);
  }

  render() {
    const { ...props } = this.props;
    const { width, height, cover } = this.state;
    const { title, authors = []} = props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width, height, maxHeight: 200, backgroundImage: `url("${cover}")` }}></div>
          <ShelfOptions {...props} onMoveShelf={this.handleMoveShelf} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(" and ")}</div>
      </div>
    )
  }
}
