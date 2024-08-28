import express from "express"
import morgan from "morgan"
import cors from "cors"

morgan.token("body", (req) => JSON.stringify(req.body))

const app = express()
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :body"))
app.use(cors())
app.use(express.static("dist"))

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/info", (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people.</p>` +
        `<p>${Date().toString()}</p>`
    )
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find((p) => p.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter((p) => p.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const id = String(Math.floor(Math.random() * 10000000000))
    // console.log("Body", request.body)

    const { name, number } = request.body
    if ((!name) || (!number)) {
        response.status(400).json({
            error: "'name' and 'number' must be specified"
        })
        return
    }
    if (persons.some((p) => p.name === name)) {
        response.status(400).json({
            error: `'${name}' is already in phonebook`
        })
        return
    }

    const person = {
        id: id,
        name: name,
        number: number
    }
    persons = persons.concat(person)

    response.json(person)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
