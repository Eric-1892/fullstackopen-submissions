import { useState } from 'react'


import React from 'react'

const StatisticLine = ({value, text}) =>{
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}


const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad

  if(all === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const ave = (good - bad) / all
  const positive = (good / all) * 100

  return(
    <table>
      <tbody>
        <StatisticLine value={good} text='good'></StatisticLine>
        <StatisticLine value={neutral} text='neutral'></StatisticLine>
        <StatisticLine value={bad} text='bad'></StatisticLine>
        <StatisticLine value={all} text='all'></StatisticLine>
        <StatisticLine value={ave} text='average'></StatisticLine>
        <StatisticLine value={positive +' %'} text='positive'></StatisticLine>
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const voteGood = () =>{
    setGood(good + 1)
  }

  const voteNeutral = () =>{
    setNeutral(neutral + 1)
  }

  const voteBad = () =>{
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={voteGood} text='good'></Button>
      <Button handleClick={voteNeutral} text='neutral'></Button>
      <Button handleClick={voteBad} text='bad'></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App