import { Person } from "../App"

function Contacts({
  persons,
  currentFilter,
}: {
  persons: Person[]
  currentFilter: string
}) {
  return (
    <>
      <h2> Numbers </h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(currentFilter.toLowerCase())
        )
        .map((person) => (
          <p key={person.name}>
            {person.name}, {person.number}
          </p>
        ))}
      )
    </>
  )
}

export { Contacts }
