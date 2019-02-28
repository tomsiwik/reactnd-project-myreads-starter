import React, { Component } from "react";

import { ShelfOptions } from ".";

export class Book extends Component {
  state = {
    width: 140,
    height: 200,
    cover: ""
  }

  handleThumbnail = (image) => {
    const { thumbnail } = image;

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

  componentDidMount(){
    const { book: { imageLinks: image} } = this.props;

    this.handleThumbnail(image);    
  }

  componentDidUpdate(prevProps){
    const { book: { imageLinks: prevImage } } = prevProps;
    const { book: { imageLinks: currentImage } } = this.props;

    if(prevImage.thumbnail !== currentImage.thumbnail)
      this.handleThumbnail(currentImage);
  }

  handleMoveShelf = (shelf) => {
    const { onMoveShelf, book } = this.props;
    onMoveShelf(book, shelf);
  }

  render() {
    const { book, ...props } = this.props;
    const { width, height, cover } = this.state;
    const { title, authors = [], shelf} = book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width, height, maxHeight: 200, backgroundImage: `url("${cover}")` }}></div>
          <ShelfOptions {...props} shelf={shelf} onMoveShelf={this.handleMoveShelf} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(" and ")}</div>
      </div>
    )
  }
}
