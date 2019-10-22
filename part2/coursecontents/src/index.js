import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}

const Content = ({parts}) => {

    const rows = () => parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )
    return (
        <div>
            {rows()}
        </div>
    )
}



const Course = ({course}) => {
    return (
        <div>
        <Header course={course} />
        <Content  parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      }

    return (
        <div>
             <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
