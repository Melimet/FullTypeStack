import { useState } from "react"

type values = {
  good: number
  neutral: number
  bad: number
}
function Total({ good, neutral, bad }: values) {
  return (
    <tr>
      <td>Total</td>
      <td>{good + neutral + bad}</td>
    </tr>
  )
}

function Average({ good, neutral, bad }: values) {
  return (
    <tr>
      <td>Average:</td>
      <td>{(good - bad) / (good + neutral + bad)}</td>
    </tr>
  )
}

function Positive({ good, neutral, bad }: values) {
  return (
    <tr>
      <td>Positive:</td>
      <td>{good / (good + neutral + bad)}%</td>
    </tr>
  )
}

function StatisticLine({ text, value }: { text: string; value: number }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function Statistics({ good, neutral, bad }: values) {
  if (!good && !neutral && !bad)
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />

          <Total good={good} neutral={neutral} bad={bad} />
          <Average good={good} neutral={neutral} bad={bad} />
          <Positive good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </>
  )
}

function Button({ onClick, name }: { onClick: () => void; name: string }) {
  return <button onClick={onClick}>{name}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleClick(setter: (i: number) => void, value: number) {
    return () => setter(value + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleClick(setGood, good)} name={"good"} />
      <Button onClick={handleClick(setNeutral, neutral)} name={"neutral"} />
      <Button onClick={handleClick(setBad, bad)} name={"bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
