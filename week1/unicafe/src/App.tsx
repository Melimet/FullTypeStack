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

const App = () => {
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)

  return (
    <div>
      <h2>give feedback</h2>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
      
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Total good={good} neutral={neutral} bad={bad}/>
      <Average good={good} neutral={neutral} bad={bad}/> 
      <Positive good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App