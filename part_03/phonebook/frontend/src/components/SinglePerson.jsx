const SinglePerson = ({ person, removePerson }) => {
    return (
        <div>
            <span>{person.name} {person.number}</span>
            <button onClick={() => removePerson(person)}>delete</button>
        </div>
    )
}

export default SinglePerson
