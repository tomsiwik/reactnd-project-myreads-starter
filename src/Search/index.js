import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Books } from "../BookCase";
import * as BooksAPI from "../utils/BooksAPI";

const SEARCH_TERMS = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'].map(term => term.toLowerCase())

export default class Search extends Component {
  state = {
    query: "",
    cache: {}
  }

  handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

      const { cache } = this.state;
      const now = Date.now();
      const cacheExpiry = cache[query] ? cache[query].expires : 0;

      if(now > cacheExpiry && SEARCH_TERMS.includes(query)){
        BooksAPI.search(query).then(results => {
          this.setState({
            query,
            cache : {
              ...cache,
              [query]: {
                expires: now + 360000,
                data: results
              }
            }
          })
        })
      }else{
        this.setState({ query })
      }
  }

  render() {
    const { query, cache } = this.state;
    const { books, ...props } =this.props;
    const { [query]: booksQuery } = cache;
    
    const shelf = { id: "none", title: "None", books: []};

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input onChange={this.handleSearch} type="text" placeholder="Search by title or author" value={query} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
          { booksQuery && booksQuery.data && 
            <Books {...props} books={booksQuery.data} shelf={shelf} /> }
        </div>
      </div>
    );
  }
}
