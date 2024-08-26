import SinglePerson from "./SinglePerson"

const Persons = ({ persons, filter }) => {
    return (
        <>
            {
                persons.filter(
                    (person) => person.name.toLowerCase().includes(filter.toLowerCase())
                ).map(
                    (person) =>
                        <SinglePerson key={person.name} person={person} />
                )
            }
        </>
    )
}

export default Persons
