import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}


const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map( part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}    
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}


export default Course