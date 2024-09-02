import express from "express"
import morgan from "morgan"
import cors from "cors"

import Person from "./people.js"

morgan.token("body", (req) => JSON.stringify(req.body))

const app = express()
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :body"))
app.use(cors())
app.use(express.static("dist"))

// let persons = [
//     {
//         "id": "1",
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": "2",
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": "3",
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": "4",
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

app.get("/info", (request, response) => {
    Person
        .countDocuments({})
        .then((N) => {
            response.send(
                `<p>Phonebook has info for ${N} people.</p>` +
                `<p>${Date().toString()}</p>`
            )
        })
        .catch((error) => {
            console.log("failed to get number of documents:", error)
            response.status(500).end()
        })

})

app.get("/api/persons", (request, response) => {
    Person
        .find({})
        .then((persons) => {
            console.log(`Got ${persons.length} people from DB`)
            response.json(persons)
        })
        .catch((error) => {
            console.log("Failed to retrieve people from DB:", error.message)
            response.status(500).end()
        })
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    Person
        .findById(id)
        .then((person) => {
            if (person) {
                console.log(`retrieved '${person.name}' from DB`)
                response.json(person)
            }
            else {
                console.log(`Failed to retrieve person with ID ${id}`)
                response.status(404).end()
            }
        })
        .catch((error) => {
            console.log(`Failed to retrieve person with ID ${id}:`, error.message)
            response.status(404).end()
        })


})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter((p) => p.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    // console.log("Body", request.body)

    const { name, number } = request.body
    if ((!name) || (!number)) {
        response.status(400).json({
            error: "'name' and 'number' must be specified"
        })
        return
    }
    // if (persons.some((p) => p.name === name)) {
    //     response.status(400).json({
    //         error: `'${name}' is already in phonebook`
    //     })
    //     return
    // }

    const person = new Person({
        name: name,
        number: number
    })
    person
        .save()
        .then((result) => {
            response.json(result)
        })
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
