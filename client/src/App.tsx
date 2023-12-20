import { useEffect, useState } from "react"
import Header from "./Header"
import Input from "./Input"
import List from "./List"
import './App.css'
import Footer from "./Footer"

export type TTodoRestItem = { id: number, text: string, date: string }

export default function App() {

  const [syncStateIcon, setSyncStateIcon] = useState("pending");

  const [todolist, setTodolist] = useState<TTodoRestItem[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/item")
      .then(response => response.json())
      .then(data => {
        setTodolist(data);
        setSyncStateIcon('synced');
      })
  }, [])

  

  return (
    <main className={syncStateIcon}>
      <div className="contentWrapper">
        <Header syncStateIcon={syncStateIcon} setTodolist={setTodolist} setSyncStateIcon={setSyncStateIcon} />
        <Input setTodolist={setTodolist} todolist={todolist} setSyncStateIcon={setSyncStateIcon} />
        <List setTodolist={setTodolist} setSyncStateIcon={setSyncStateIcon} todolist={todolist} />
        <Footer setTodolist={setTodolist} setSyncStateIcon={setSyncStateIcon} />
      </div>
    </main>
  )
}
