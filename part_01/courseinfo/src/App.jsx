const Header = (props) => {
  // Header takes care of rendering the name of the course
  console.log("Props passed to 'Header': " + JSON.stringify(props))
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  console.log("Props passed to 'Part': " + JSON.stringify(props))
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  // Content renders the parts and their number of exercises
  console.log("Props passed to 'Content': " + JSON.stringify(props))
  return (
    <div>
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </div>
  )
}

const Total = (props) => {
  // Total renders the total number of exercises
  console.log("Props passed to 'Total': " + JSON.stringify(props))
  return (
    <>
      <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}

export default App
