import express from "express"
import cors from "cors"
import config from "./utils/config.js"


const app = express()



const mongoUrl = config.MONGODB_URI
mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Connected to Mongo")
    })
    .catch((error) => {
        console.log("Failed to connect to Mongo:", error)
    })


app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post("/api/blogs", (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = config.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
