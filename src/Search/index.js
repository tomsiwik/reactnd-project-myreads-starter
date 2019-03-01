import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Books } from "../BookCase";
import * as BooksAPI from "../utils/BooksAPI";

const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  }
}

export default class Search extends Component {
  state = {
    query: "",
    results: {
      error: "Please type into the search bar. Results empty.",
      items: []
    },
    loading: false
  }

  handleChange = (event) => {
    this.handleSearch(event.target.value);
  }

  handleSearch = debounce((search) => {
    const query = search.toLowerCase();

    if(query.trim() !== ""){
      this.setState(({results}) => ({
        loading: true,
        results: {
          ...results,
          error: null
        }
      }))

      BooksAPI.search(query).then(response => {
        const results = response.error ? {
          ...response,
          // TODO: Please add a nicer error message in API, 
          // Remove below line if API-centric message handling needed
          error: `No Results for query: "${search}"`
        } : {
          error: null,
          items: response
        }

        this.setState({
          query,
          results,
          loading: false
        })
      })
    }else{
      this.setState({
        query,
        results: {
          error: "Please type into the search bar. Results empty.",
          items: []
        }
      })
    }
  }, 500)

  render() {
    const { books, ...props } = this.props;
    const { results: { error, items }, loading } = this.state;

    const mergedBooks = items.map(book => 
      ({ 
        ...book, 
        shelf: books[book.id] ? books[book.id].shelf : "none" 
      })
    );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" replace className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.handleChange} type="text" placeholder="Search by title or author" />
          </div>
          {
          loading && <div className="books-loading"><h4>Loading...</h4></div>
          }
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Books {...props} books={mergedBooks} />
          </ol>
          { 
            error && <div className="books-empty"><h4>{ error }</h4></div>
          }
          
        </div>
      </div>
    );
  }
}
