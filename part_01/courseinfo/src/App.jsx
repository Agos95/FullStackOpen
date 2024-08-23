const Header = (props) => {
  // Header takes care of rendering the name of the course
  console.log("Props passed to 'Header':")
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  console.log("Props passed to 'Part':")
  console.log(props)
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  // Content renders the parts and their number of exercises
  console.log("Props passed to 'Content':")
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  // Total renders the total number of exercises
  console.log("Props passed to 'Total':")
  console.log(props)
  let tot = 0
  props.parts.forEach((item) => tot += item.exercises)
  return (
    <>
      <p>Number of exercises {tot}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
