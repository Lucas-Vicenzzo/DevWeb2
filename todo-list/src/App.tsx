import { KeyboardEvent, useState } from "react"
import './app.css'

export default function App() {
  const [todolist, setTodolist] = useState<string[]>(
    JSON.parse(localStorage.getItem('todolist') ?? '[]')
  )

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      event.currentTarget.value = ''
      const newTodoList = ([...todolist, value])
      setTodolist(newTodoList)
      localStorage.setItem('todolist', JSON.stringify(newTodoList))
    }
  }


  const removeItem = (index: number) => {
    const newTodoList = todolist.filter((_, key) => key !== index)
    localStorage.setItem('todolist', JSON.stringify(newTodoList))
    setTodolist(newTodoList )
  }

  return (
    <>
      <h1>Lista de tarefas</h1>
      <input type="text" onKeyDown={onKeyDown} />
      <ul>
        <li className="pending"></li>
        <li className="synced"></li>
        <li className="error"></li>
        {todolist.map((todo, key) =>
          <li key={key} className="pending">
            <button onClick={() => removeItem(key)}>remove</button> {todo}
          </li>
        )}
      </ul>
    </>
    
    )
}