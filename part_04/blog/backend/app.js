import { express } from "express"
import { cors } from "cors"
import { mongoose } from "mongoose"
import { config } from "./utils/config"

mongoose.set("strictQuery", false)

const mongoUrl = config.MONGODB_URI
mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log("Connected to Mongo")
    })
    .catch((error) => {
        console.log("Failed to connect to Mongo:", error)
    })

const app = express()

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())

export default app
