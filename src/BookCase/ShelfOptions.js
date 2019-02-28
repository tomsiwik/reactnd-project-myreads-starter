import React from "react";

export function ShelfOptions({ onMoveShelf, shelf, shelfNames }) {
  const handleChange = (event) => {
    onMoveShelf(event.target.value)
  }

  const dashericedShelf = shelf.replace(/([A-Z])/g, $1 => "-" + $1.toLowerCase());

  return (
    <div className={`book-shelf-changer ${dashericedShelf}`}>
      <select onChange={handleChange} defaultValue={shelf}>
        <option value="move" disabled>Move to...</option>
        { Object.entries(shelfNames).map(([ id, title ]) => (
          <option key={"opt_" + id} value={id}>{title}</option>  
        )) }
        <option value="none">None</option>
      </select>
    </div>
  )
}
