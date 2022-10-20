import React from "react"

interface FilterProps {
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
  currentFilter: string
}


function Filter({
  handleFilter,
  currentFilter,
}: FilterProps ) {
  return (
    <p>
      filter contacts
      <input value={currentFilter} onChange={handleFilter}></input>
    </p>
  )
}

export { Filter }
