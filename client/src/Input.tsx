import { KeyboardEvent, useState } from "react"
import { TTodoRestItem } from "./App"

type TProps = {
  todolist: TTodoRestItem[],
  setTodolist: (todolist: TTodoRestItem[]) => void,
  setSyncStateIcon: (syncStateIcon: string) => void
}

export default function Input (props: TProps) {
  const { todolist, setTodolist, setSyncStateIcon } = props
  const [currentId, setCurrentId] = useState(1)

  async function updateTodoList() {
    await fetch("http://localhost:3000/item")
    .then(response => response.json())
    .then(data => setTodolist(data))
    setSyncStateIcon('synced')
  }

  async function createTodoItem(value: string) {
    await fetch("http://localhost:3000/item", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: value })
      })
      updateTodoList()
  }

  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value !== '') {
      const value = event.currentTarget.value
      event.currentTarget.value = ''
      try {
        setCurrentId(todolist[0].id)
      } catch {
        setCurrentId(1)
      }
      setSyncStateIcon('pending');
      const NewTodoList = [{ id: currentId, text: value, date: 'Agora a pouco' }, ...todolist]
      createTodoItem(value)
      setTodolist(NewTodoList)
      setCurrentId(currentId + 1);
      console.log(todolist)
    }
  }

  return <>
    <input className="input-action" type="text" placeholder="o que você fará depois?" onKeyDown={onKeyDown} />
  </>
}