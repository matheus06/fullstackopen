import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Average = ({ value }) => (
    <tr>
        <td>average</td><td>{value}</td>
    </tr>
)

const Positive = ({ value }) => (
    <tr>
        <td>positive</td><td>{value} %</td>
    </tr>
)

const All = ({ value }) => (
    <tr>
        <td>all</td><td>{value}</td>
    </tr>
)

const Statistics = ({ value, text }) => (
    <tr>
        <td>{text}</td><td>{value}</td>
    </tr>
)

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    if (good + neutral + bad === 0) {
        return (
            <div>
                <h1>give feedback</h1>
                <Button onClick={handleGoodClick} text="good" />
                <Button onClick={handleNeutralClick} text="neutral" />
                <Button onClick={handleBadClick} text="bad" />
                <h1>statistics</h1>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="neutral" />
            <Button onClick={handleBadClick} text="bad" />
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistics value={good} text="good" />
                    <Statistics value={neutral} text="neutral" />
                    <Statistics value={bad} text="bad" />
                    <Average value={((good * 1) + (bad * -1)) / (good + neutral + bad)} />
                    <All value={good + neutral + bad} />
                    <Positive value={(good / (good + neutral + bad)) * 100}></Positive>
                </tbody>
            </table>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)