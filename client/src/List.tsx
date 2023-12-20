import { KeyboardEvent, MouseEvent } from "react"
import { TTodoRestItem } from "./App"
import * as dateFns from 'date-fns'

type TProps = {
  todolist: TTodoRestItem[],
  setTodolist: (todolist: TTodoRestItem[]) => void,
  setSyncStateIcon: (syncStateIcon: string) => void
}

export default function List (props: TProps) {
  const { todolist, setTodolist, setSyncStateIcon } = props

  async function updateTodoList() {
    await fetch("http://localhost:3000/item")
    .then(response => response.json())
    .then(data => setTodolist(data))
    setSyncStateIcon('synced')
  }

  const removeItem = async (event: MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.dataset.id) as number
    const li = event.currentTarget.closest('li') as HTMLLIElement
    props.setSyncStateIcon('pending')
    li.className = 'deleting'
    await fetch(`http://localhost:3000/item/${id}`, { method: 'DELETE' })
    li.className = 'deleted'
    setTimeout(() => {
      setTodolist(todolist.filter(todo => todo.id !== id))
      updateTodoList()
    }, 300)
  }

  const keyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = event.currentTarget.value
      const id = event.currentTarget.dataset.id
      props.setSyncStateIcon('pending')
      const request = await fetch(`http://localhost:3000/item/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: value })
      })
      const response = await request.json()
      console.log(response)
      props.setSyncStateIcon('synced')
    }
  }

  return <>
    <ul>
      {todolist.map((todo) =>
        <li key={todo.id} data-id={todo.id} className={todo.id < 0 ? "pending" : "synced"}>
          <input data-id={todo.id} defaultValue={todo.text} onKeyDown={keyDown} />
          <button data-id={todo.id} onClick={removeItem}>
            <span>delete</span>
          </button>
          <p>{todo.date === 'Agora a pouco' ? 'Agora a pouco' : dateFns.format(dateFns.parseISO(todo.date), 'dd/MM - HH:mm')}</p>
        </li>
      )}
    </ul>
  </>
}