
import React, { useState } from 'react'

const Numbers = ({ persons }) => {

  const rows = () => persons.map((person,index) =>
    <p key={index}> {person.name}</p>
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }
    
    if(persons.map(p => p.name).indexOf(newName)<0)
    {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
    else {
        window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}></Numbers>
    </div>
  )
}

export default App