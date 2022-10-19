import { useState } from 'react'

type values = {
  good: number,
  neutral: number,
  bad: number
}
function Total({good, neutral, bad}: values){
  return <p>Total: {good+neutral+bad}</p>
}

function Average({good, neutral, bad}: values){
  return <p>Average: {(good - bad)/(good+neutral+bad)}</p>
}

function Positive({good, neutral, bad}: values){
  return <p>Positive: {good / (good+neutral+bad)}%</p>
}

function StatisticLine({text, value}: {text:string, value: number}){
  return <p>{text} {value}</p>
}

function Statistics({good, neutral, bad}: values){
  
  if (!good && !neutral && !bad) 
  return (
  <>
    <h2>statistics</h2> 
    <p>No feedback given</p>
  </>
  )

  return <>
      <h2>statistics</h2>

      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>

      <Total good={good} neutral={neutral} bad={bad}/>
      <Average good={good} neutral={neutral} bad={bad}/> 
      <Positive good={good} neutral={neutral} bad={bad}/>
    </>
}

function Button({name}: {name:string}){
  return <button>{name}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button name={"good"}/>
      <Button name={"neutral"}/>
      <Button name={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App