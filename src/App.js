import "./App.css";

import React from "react";
import { Route } from "react-router-dom";

import Books from "./Books";
import Search from "./Search";
import * as BooksAPI from "./utils/BooksAPI";

class BooksApp extends React.Component {
  state = {
    shelves: [
      ["currentlyReading", "Currently Reading"],
      ["wantToRead", "Want to Read"],
      ["read", "Read"]
    ],
    books : []
  }

  addBook = (book) => {
    this.setState(({ books })=>{ 
      const bookIdx = books.findIndex(oldbook => oldbook.id === book.id);

      if(bookIdx === -1){
        return { 
          books: [
            ...books,
            book
          ]
        }
      }
      
      return null
    })
  }

  removeBook = (book) => {
    this.setState(({ books })=>{ 
      const bookIdx = books.findIndex(oldbook => oldbook.id === book.id);

      return { books: [
        ...books.slice(0, bookIdx),
        ...books.slice(bookIdx + 1)
      ]}
    })
  }

  updateBook = (book, shelf) => {
    this.setState(({ books })=>{ 
      const bookIdx = books.findIndex(oldbook => oldbook.id === book.id);

      return { books: [
        ...books.slice(0, bookIdx),
        { ...book, shelf },
        ...books.slice(bookIdx + 1)
      ]}
    })
  }

  handleMoveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((bookMap) => {
      // TODO: evaluate bookMap, is this needed? Should I reconsider
      // mapping all books into a map similar to bookMap ?
      shelf === "none" ? this.deleteBook(book) : this.updateBook(book, shelf) ;
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => this.setState({books}));
  }

  render() {
    const { books, shelves } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <Books books={books} shelves={shelves} onMoveShelf={this.handleMoveShelf} />
        }/>
        <Route path="/search" component={Search}/>
      </div>
    )
  }
}

export default BooksApp
