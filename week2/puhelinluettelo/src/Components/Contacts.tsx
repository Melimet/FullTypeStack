import { Person } from "../App"
import { removeContact } from "../services/contacts"

interface ContactsProps {
  persons: Person[]
  currentFilter: string
  removeContactFromState: (removedPerson: Person) => void
}

function Contacts({ persons, currentFilter, removeContactFromState }: ContactsProps) {

  async function handleRemoveContact(person: Person) {
    if (window.confirm("Remove contact?")) {
      const resultStatus = await removeContact(person)
      if (resultStatus == 200) removeContactFromState(person)
    }
  }

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
            <button onClick={() => handleRemoveContact(person)} type="button">Delete</button>
          </p>
        ))}
    </>
  )
}

export { Contacts }
