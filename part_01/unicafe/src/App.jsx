import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatLine = ({ text, value }) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatLine text="good" value={good} />
          <StatLine text="neutral" value={neutral} />
          <StatLine text="bad" value={bad} />
          <StatLine text="all" value={total} />
          <StatLine text="average" value={`${average.toFixed(4)}`} />
          <StatLine text="positive" value={`${positive.toFixed(2)} %`} />
        </tbody>
      </table>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("Previous 'good' value =", good)
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    console.log("Previous 'neutral' value =", neutral)
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    console.log("Previous 'bad' value =", bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
