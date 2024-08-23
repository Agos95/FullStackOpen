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
    (s, p) => {
      console.log(s, p)
      return s + p.exercises
    }
    , 0)
  return (
    <p>total of {total} exercises</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <>
      <Course key={course.id} course={course} />
      <Total parts={course.parts} />
    </>
  )
}

export default App
