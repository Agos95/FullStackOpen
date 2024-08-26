import { useState, useEffect } from 'react'
import axios from "axios"
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
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(
        {
          name: newName,
          number: newNumber
        }
      ))
    }
    setNewName("")
    setNewNumber("")
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
      />
    </div>
  )
}

export default App
