import React, { Component } from "react";

import { ShelfOptions } from ".";

export class Book extends Component {
  state = {
    width: 140,
    height: 200,
    cover: ""
  }

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

  render() {
    const { ...props } = this.props;
    const { width, height, cover } = this.state;
    const { title, authors} = props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width, height, maxHeight: 200, backgroundImage: `url("${cover}")` }}></div>
          <ShelfOptions {...props} />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(" and ")}</div>
      </div>
    )
  }
}
