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
    // check if person already in phonebook
    const person = persons.find((p) => p.name === newName)
    // there is no person
    if (typeof person === "undefined") {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      dbService
        .create(newPerson)
        .then((p) => {
          setPersons(persons.concat(p))
        })
    }
    // person already present
    else {
      if (window.confirm(`${newName} is already added to phonebook. Replace old number (${person.number}) with a new one (${newNumber})?`)) {
        const updatedPerson = { ...person, number: newNumber }
        dbService
          .update(updatedPerson)
          .then((p) => {
            setPersons(persons.map((person) => p.id !== person.id ? person : p))
          })
      }
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
