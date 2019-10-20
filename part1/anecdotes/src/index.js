import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const App = (props) => {
    const [selected, setSelected] = useState(Math.floor((Math.random() * 5) + 1))
    const [points, setAnecdotePoint] = useState([0, 0, 0, 0, 0, 0])
    let indexOfMaxValue = points.indexOf(Math.max(...points));
    const newRandom = newValue => {
        setSelected(newValue)
    }

    const addPoint = () => {
        indexOfMaxValue = points.indexOf(Math.max(...points));
        const copy = [...points]
        copy[selected] += 1
        setAnecdotePoint(copy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <div>has {points[selected]} votes</div>
            <Button handleClick={() => addPoint()} text="vote" />
            <Button handleClick={() => newRandom(Math.floor((Math.random() * 5) + 1))} text="next anecdote" />
            <h1>Anecdote with most votes</h1>
            {props.anecdotes[indexOfMaxValue]}
            <div>has {points[indexOfMaxValue]} votes</div>

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
