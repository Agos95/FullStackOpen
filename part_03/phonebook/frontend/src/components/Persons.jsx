import SinglePerson from "./SinglePerson"

const Persons = ({ persons, filter, removePerson }) => {
    return (
        <>
            {
                persons.filter(
                    (person) => person.name.toLowerCase().includes(filter.toLowerCase())
                ).map(
                    (person) =>
                        <SinglePerson key={person.id} person={person} removePerson={removePerson} />
                )
            }
        </>
    )
}

export default Persons
