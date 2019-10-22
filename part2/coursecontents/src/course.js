import React from 'react'

const Header = (props) => {
    return (
        <div>
            <h2>{props.course.name}</h2>
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

const Content = ({ parts }) => {
    debugger
    const rows = () => parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course