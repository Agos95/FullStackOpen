import express, { response } from "express"
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

app.get("/info", (request, response, next) => {
    Person
        .countDocuments({})
        .then((N) => {
            response.send(
                `<p>Phonebook has info for ${N} people.</p>` +
                `<p>${Date().toString()}</p>`
            )
        })
        .catch((error) => {
            console.error("failed to get number of documents:", error)
            next(error)
        })

})

app.get("/api/persons", (request, response, next) => {
    Person
        .find({})
        .then((persons) => {
            console.log(`Got ${persons.length} people from DB`)
            response.json(persons)
        })
        .catch((error) => {
            console.error("Failed to retrieve people from DB:", error.message)
            next(error)
        })
})

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Person
        .findById(id)
        .then((person) => {
            if (person) {
                console.log(`retrieved '${person.name}' from DB`)
                response.json(person)
            }
            else {
                console.error(`Failed to retrieve person with ID ${id}`)
                response.status(404).end()
            }
        })
        .catch((error) => {
            console.error(`Failed to retrieve person with ID ${id}:`, error.message)
            next(error)
        })


})

app.delete("/api/persons/:id", (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(204).end()
        })
        .catch((error) => {
            console.error("Failed to delete:", error)
            next(error)
        })
})

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body
    const person = {
        name: name,
        number: number
    }
    Person
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch((error) => {
            console.error("Failed tu update:", error)
            next(error)
        })
})

app.post("/api/persons", (request, response, next) => {
    // console.log("Body", request.body)

    const { name, number } = request.body
    if ((!name) || (!number)) {
        response.status(400).json({
            error: "'name' and 'number' must be specified"
        })
        return
    }

    const person = new Person({
        name: name,
        number: number
    })
    person
        .save()
        .then((result) => {
            response.json(result)
        })
        .catch((error) => {
            console.error("Failed to save to db", error)
            next(error)
        })
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    response.status(400).send({ error: error })
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
