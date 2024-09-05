import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://federicoagostini:${password}@agostini-scaiitec-clust.sybna.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=agostini-scaiitec-cluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('Listing all the entries in the db')
  Person
    .find({})
    .then((result) => {
      console.log('phonebook')
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}
else if (process.argv.length === 5) {
  const [name, number] = process.argv.slice(3)
  const person = new Person({
    name: name,
    number: number,
  })

  person
    .save()
    .then(() => {
      console.log(`Added '${name}' number ${number} to phonebook`)
      mongoose.connection.close()
    })
}


