import "./App.css";

import React from "react";
import { Route } from "react-router-dom";

import BookCase from "./BookCase";
import Search from "./Search";
import * as BooksAPI from "./utils/BooksAPI";

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: {
        id: "currentlyReading",
        title: "Currently Reading",
        books: []
      },
      wantToRead: {
        id: "wantToRead",
        title: "Want to Read",
        books: []
      },
      read: {
        id: "read",
        title: "Read",
        books: []
      }
    },
    books: []
  };

  handleMoveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelves => {
      this.setState(({ shelves: currentShelves }) => ({
        shelves: Object.entries(shelves).reduce((acc, [shelf, books]) => {
          acc[shelf].books = books;
          return acc;
        }, currentShelves)
      }));
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(({ shelves }) => ({
        books,
        shelves: books.reduce((acc, book) => {
          acc[book.shelf].books.push(book.id);
          return acc;
        }, shelves)
      }));
    });
  }

  render() {
    const { books, shelves } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookCase
              books={books}
              shelves={shelves}
              onMoveShelf={this.handleMoveShelf}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              books={books}
              shelves={shelves}
              onMoveShelf={this.handleMoveShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
