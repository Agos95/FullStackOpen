import mongoose from "mongoose"
import { config } from "dotenv"
config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
    .connect(url)
    .then((result) => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return (v.length > 7) && (/^\d{2,3}-\d+$/.test(v))
            },
            message: (props) => {
                return `${props.value} is not a valid phone number`
            }
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model("Person", personSchema)

export default Person

