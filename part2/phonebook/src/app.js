
import React, { useState, useEffect } from 'react'
import personService from './service/person'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  if (error) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const Persons = ({ persons, filter, removePerson }) => {
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const rows = () => personsToShow.map((person) =>
    <p key={person.id}> {person.name} {person.number}<Button handleClick={() => removePerson(person)} text="delete" /></p>
  )
  return (
    <div>
      {rows()}
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {

  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const PersonForm = ({ onSubmit, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll().then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const removePerson = (person) => {
    if (window.confirm("Delete " + person.name + "?")) {
      personService
        .remove(person.id).then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setMessage(
            `Information of ${newName} has already been removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setError(true)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.map(p => p.name).indexOf(newName) < 0) {

      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setError(false)
        })

    }
    else {
      if (window.confirm(newName + "is already added to phonebook, replace the old number with a new one?")) {
        var person = persons.find(x => x.name === newName);
        nameObject.id = person.id
        personService
          .update(person.id, nameObject)
          .then(() => {
            var foundIndex = persons.findIndex(x => x.name === newName);
            const copy = [...persons]
            copy[foundIndex] = nameObject
            setPersons(copy)
            setNewName('')
            setNewNumber('')
            setMessage(
              `Updated ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setError(false)
          })
          .catch(error => {
            setMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setError(true)
            setPersons(persons.filter(x => x.name !== newName))
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} removePerson={(person) => removePerson(person)}></Persons >
    </div>
  )
}

export default App