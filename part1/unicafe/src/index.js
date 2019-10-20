import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Average = ({ value }) => (
    <div>
        average {value}
    </div>
)

const Positive = ({ value }) => (
    <div>
        positive {value} %
    </div>
)

const All = ({ value }) => (
    <div>
        all {value}
    </div>
)

const Statistics = ({ value, text }) => (
    <div>
        {text} {value}
    </div>

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

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="neutral" />
            <Button onClick={handleBadClick} text="bad" />
            <h1>statistics</h1>
            <Statistics value={good} text="good" />
            <Statistics value={neutral} text="neutral" />
            <Statistics value={bad} text="bad" />
            <Average value={((good * 1) + (bad * -1)) / (good + neutral + bad)} />
            <All value={good + neutral + bad} />
            <Positive value={(good / (good + neutral + bad)) * 100}></Positive>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)