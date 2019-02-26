import React from "react";

export function ShelfOptions({ onMoveShelf, shelves, shelf }) {
  /**
   * Shelf options doesn't need to know about the book, 
   * just which shelve was switched
   */
  const handleChange = (event) => {
    onMoveShelf(event.target.value)
  }

  const dashericedShelf = shelf.id.replace(/([A-Z])/g, $1 => "-" + $1.toLowerCase());

  return (
    <div className={`book-shelf-changer ${dashericedShelf}`}>
      <select onChange={handleChange} defaultValue={shelf.id}>
        <option value="move" disabled>Move to...</option>
        { Object.values(shelves).map(({ id, title }) => (
          <option key={"opt_" + id} value={id}>{title}</option>  
        )) }
        <option value="none">None</option>
      </select>
    </div>
  )
}
