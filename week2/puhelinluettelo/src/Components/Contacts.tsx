import { Message, Person } from "../App"
import { removeContact } from "../services/contacts"

interface ContactsProps {
  persons: Person[]
  currentFilter: string
  removeContactFromState: (removedPerson: Person) => void
  createMessage: (message: Message) => void
}

function Contacts({
  persons,
  currentFilter,
  removeContactFromState,
  createMessage,
}: ContactsProps) {
  async function handleRemoveContact(person: Person) {
    if (window.confirm("Remove contact?")) {
      try {
        const resultStatus = await removeContact(person)
        console.log(resultStatus)
        if (resultStatus == 200) removeContactFromState(person)
      } catch (error) {
        createMessage({
          message: "Contact has already been deleted",
          goodNews: false,
        })
      }
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
          <p className="contact" key={person.name}>
            {person.name}, {person.number}
            <button onClick={() => handleRemoveContact(person)} type="button">
              Delete
            </button>
          </p>
        ))}
    </>
  )
}

export { Contacts }
