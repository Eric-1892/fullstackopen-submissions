// App resbonsible for transmission parameters
const App = () => {
  const course =  {
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
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// child compoenents resbonsible for display style
const Header = ({course}) => {
  return (
    <div>
      <h1>Course Name: {course.name}</h1>
    </div>
  )
}

// const Content = ({parts}) => {
//   return (
//     <div>
//       <Part name={parts[0].name} exercises={parts[0].exercises}/>
//       <Part name={parts[1].name} exercises={parts[1].exercises}/>
//       <Part name={parts[2].name} exercises={parts[2].exercises}/>
//     </div>
//   )
// }

// 入参传对象的多个字段
// const Part = ({name, exercises}) => {
//   return (
//     <div>
//       <p>
//         {name}, {exercises}
//       </p>
//     </div>
//   )
// }

const Content = ({ parts }) => {
  return (
    <div>
      <Part parts={parts[0]} />
      <Part parts={parts[1]} />
      <Part parts={parts[2]} />
    </div>
  )
}

// 入参传整个对象
const Part = ({ parts }) => {
  return (
    <div>
      <p>
        {parts.name}, {parts.exercises}
      </p>
    </div>
  )
}



const Total = ({parts}) => {
  return (
    <p>
      Number of exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  )
}


export default App