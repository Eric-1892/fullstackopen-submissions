import { useState } from 'react'

import React from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>  
  )
}

const Statistics = ({value}) => {
  return(
    <div>has {value} votes</div>
  )
}

const Anecdote = ({title, contents, votes, selected}) => {
  if(title === 'Anecdote of the day'){
    return(
      <div>
        <h1>{title}</h1>
        <p>{contents[selected]}</p>
        <Statistics value={votes[selected]}></Statistics>
      </div>
    )
  } else if(title ==='Anecdote with most votes'){

    const maxVotes = Math.max(...votes)
    let content = ''
    if(maxVotes === 0){
      content = 'No votes yet'
    }else{
      const maxIndex = votes.indexOf(maxVotes)
      content = contents[maxIndex]

       return(
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
          <Statistics value={votes[maxIndex]}></Statistics>
        </div>
      )
    }
  }
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))



  const goNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)  
  }

  const updateVotes = () => {
    const copy = [...votes]
    copy[selected] +=1
    setVotes(copy)
  }


  return (
    <div>
    <Anecdote title='Anecdote of the day' contents={anecdotes} votes={votes} selected={selected}></Anecdote>
    <Button handleClick={updateVotes} text='vote'></Button>
    <Button handleClick={goNext} text='next anecdote'></Button>
    <Anecdote title='Anecdote with most votes' contents={anecdotes} votes={votes} selected={selected}></Anecdote>
    </div>
  )
}

export default App