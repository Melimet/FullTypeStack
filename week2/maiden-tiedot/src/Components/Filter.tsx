interface Filter {
  filter: string
  handleFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Filter({ filter, handleFilter }: Filter) {
  return (
    <div>Filter countries 
      <input onChange={handleFilter} value={filter}></input>
    </div>
  )
}

export { Filter }
