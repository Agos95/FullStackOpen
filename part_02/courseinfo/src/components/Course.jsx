const Header = ({ name }) => {
    // Header takes care of rendering the name of the course
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ parts }) => {
    // Content renders the parts and their number of exercises
    return (
        <div>
            {parts.map((part) =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    // Total renders the total number of exercises
    const total = parts.reduce(
        (s, p) => s + p.exercises, 0)
    return (
        <p>total of {total} exercises</p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
