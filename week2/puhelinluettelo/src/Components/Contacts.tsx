import { Person } from "../App"

interface ContactsProps {
  persons: Person[]
  currentFilter: string
}

function Contacts({ persons, currentFilter }: ContactsProps) {
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
    </>
  )
}

export { Contacts }
