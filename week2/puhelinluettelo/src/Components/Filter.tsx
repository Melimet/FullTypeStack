import React from "react"

function Filter({
  handleFilter,
  currentFilter,
}: {
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
  currentFilter: string
}) {
  return (
    <p>
      filter contacts
      <input value={currentFilter} onChange={handleFilter}></input>
    </p>
  )
}

export { Filter }
