import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

const SERVER_URL = 'http://localhost:5000/tasks'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const serverTasks = await fetchTasks()
      setTasks(serverTasks)
    }
    getTasks()
  }, [])

  // fetch tasks from json-server
  const fetchTasks = async () => {
    const result = await fetch(SERVER_URL)
    return await result.json()
  }

  const fetchTask = async (id) => {
    const result = await fetch(`${SERVER_URL}/${id}`)
    return await result.json()
  }

  const addTask = async (task) => {
    const result = await fetch(`${SERVER_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })

    const newTask = await result.json()
    setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(`${SERVER_URL}/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter(task => task.id !== id))
  }

  const setReminder = async (id) => {
    const toggleTask = await fetchTask(id)
    const updatedTask = { ...toggleTask, reminder: !toggleTask.reminder }
    const result = await fetch(`${SERVER_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })

    const data = await result.json()
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
        <div className="container">
          <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
          <Routes>
            <Route path="/" element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                { tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={setReminder} /> :
                'No tasks'
                }
              </> 
              } />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  )
}

export default App;
