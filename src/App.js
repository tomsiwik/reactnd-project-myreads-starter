import "./App.css";

import React from "react";
import { Route } from "react-router-dom";

import BookCase from "./BookCase";
import Search from "./Search";
import * as BooksAPI from "./utils/BooksAPI";

class BooksApp extends React.Component {
  state = {
    shelfNames: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    },
    // Could not follow suggestion, shelves is needed in Search results.
    // A search component in my case is NOT a shelf, thats why I cant reuse
    // this state variable inside shelf. But yes, suggestion valid when I
    // reuse shelf for a search component. I am reusing Books here.
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    books: {
      // None
    }
  };

  handleMoveShelf = (book, shelf) => {
    const { books } = this.state;

    BooksAPI.update(book, shelf).then(shelves => {
      if(!Object.keys(books).includes(book.id)){
        // PERF: removed BooksAPI.get(book.id).then(book => {}) 
        // for better performance
        this.setState({
          shelves: {
            ...shelves,
            [shelf]: [
              ...shelves[shelf],
              book.id
            ]
          },
          books: {
            ...books,
            [book.id]: {
              ...book,
              shelf
            }
          }
        });
      }else{
        this.setState({
          shelves,
          books: {
            ...books,
            [book.id]: {
              ...books[book.id],
              shelf
            }
          }
        });
      }
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then(currentBooks => {
      const books = currentBooks.reduce((acc, book) => {
        acc[book.id] = book;
        return acc;
      }, {});

      const shelves = currentBooks.reduce((acc, book) => {
        const shelf = acc[book.shelf];
        acc[book.shelf] = shelf ? [...shelf, book.id] : [ book.id ]
        return acc;
      }, {});

      this.setState({
        books,
        shelves
      });
    });
  }

  render() {
    const { books, shelves, shelfNames } = this.state;
    
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookCase
              books={books}
              shelves={shelves}
              shelfNames={shelfNames}
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
              shelfNames={shelfNames}
              onMoveShelf={this.handleMoveShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
