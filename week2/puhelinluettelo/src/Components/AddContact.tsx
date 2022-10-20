import React from "react"

function AddContact({
  newName,
  newPhoneNumber,
  handleNameChange,
  handlePhoneNumber,
  handleSubmit,
}: {
  newName: string
  newPhoneNumber: string
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handlePhoneNumber: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.MouseEvent) => void
}) {
  return (
    <div>
      <h2>Add a new contact</h2>
      <form>
        <div>
          <label>name</label>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <label>number</label>
          <input value={newPhoneNumber} onChange={handlePhoneNumber} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  )
}

export { AddContact }
