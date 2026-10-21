import { useState } from 'react'
import TaskCard from './TaskCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main-sec">
        <div className="container">
          <h1>React TestDay</h1>
          <TaskCard />
        </div>
      </div>
    </>
  )
}

export default App
