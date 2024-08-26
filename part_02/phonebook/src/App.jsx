import { useState, useEffect } from 'react'
import axios from "axios"

import dbService from "./services/db"

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    console.log("Getting data with effect")
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log("promise fullfilled")
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    // console.log("Form Submitted!")
    event.preventDefault()
    if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
        const person = { ...persons.find((p) => p.name === newName), number: newNumber }
        dbService
          .update(person)
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      dbService
        .create(personObject)
        .then((person) => {
          setPersons(persons.concat(person))
        })
    }
    setNewName("")
    setNewNumber("")
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      dbService
        .remove(person.id)
        .then((id) => {
          setPersons(
            persons.filter((person) =>
              person.id !== id)
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        setFilter={setFilter}
      />
      <h3>Add new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
