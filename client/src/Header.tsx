import { TTodoRestItem } from "./App"

type TProps = {
  setTodolist: (todolist: TTodoRestItem[]) => void,
  setSyncStateIcon: (syncStateIcon: string) => void,
  syncStateIcon: string
}


export default function Header(props: TProps) {
  const { syncStateIcon, setTodolist, setSyncStateIcon } = props;

  async function updateTodoList() {
    setSyncStateIcon('refreshing')
    await fetch("http://localhost:3000/item")
    .then(response => response.json())
    .then(data => setTodolist(data))
    setSyncStateIcon('synced')
  }

  
  return (
    <header>
      <div className="heading">
        <h1>Lista de tarefas</h1>
        <h2>O que você fará hoje?</h2>
      </div>
      <span className={syncStateIcon} onClick={updateTodoList}/>
    </header>
    )
}