import React from "react";

export function ShelfOptions({ book, onMoveShelf, shelves }) {
  const handleChange = (event) => {
    onMoveShelf(book, event.target.value)
  }

  return (
    <div className="book-shelf-changer">
      <select onChange={handleChange} defaultValue={book.shelf}>
        <option value="move" disabled>Move to...</option>
        { shelves.map(([shelf, title]) => (
          <option key={"opt_" + shelf} value={shelf}>{title}</option>  
        )) }
        <option value="none">None</option>
      </select>
    </div>
  )
}
