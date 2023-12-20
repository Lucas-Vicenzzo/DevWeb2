import { TTodoRestItem } from "./App"

type TProps = {
  setTodolist: (todolist: TTodoRestItem[]) => void,
  setSyncStateIcon: (syncStateIcon: string) => void,
}

export default function Footer(props: TProps) {
  const { setTodolist, setSyncStateIcon } = props;

  function deleteAll() {
    fetch("http://localhost:3000/item", { method: 'DELETE' })
    .then(response => response.json())
    .then(data => setTodolist(data))
    setSyncStateIcon('synced')
  }

 
  return (
    <footer>
      <button onClick={deleteAll}>Apagar Tudo</button>
    </footer>
  )
}