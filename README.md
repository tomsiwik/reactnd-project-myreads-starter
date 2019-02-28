# MyReads by Tom

This is a fully implemented MyReads SPA reviewed with the rubrics requirements: https://review.udacity.com/#!/rubrics/918/view

## TL;DR

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Note

This implementation uses the undocumented BooksAPI `.get(...)` method to fetch a single book. 
Rather than fetching all books when adding a book from the search result through shelf selection,
only this single book (if not present within the client's dataset) is fetched via API.
Furthermore, a caching mechanism for search results and thumbnail size handling is included.
