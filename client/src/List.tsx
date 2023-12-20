import { KeyboardEvent, MouseEvent, FocusEvent } from "react";
import { TTodoRestItem } from "./App";
import * as dateFns from "date-fns";

type TProps = {
  todolist: TTodoRestItem[];
  setTodolist: (todolist: TTodoRestItem[]) => void;
  setSyncStateIcon: (syncStateIcon: string) => void;
};

export default function List(props: TProps) {
  const { todolist, setTodolist, setSyncStateIcon } = props;
  async function refreshTodoList() {
    await fetch("http://localhost:3000/item")
      .then((response) => response.json())
      .then((data) => setTodolist(data));
    setSyncStateIcon("synced");
  }

  async function updateItem(id: number, todo: string) {
    setSyncStateIcon("pending");
    const request = await fetch(`http://localhost:3000/item/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: todo }),
      });
      const response = await request.json();
      console.log(response);
      refreshTodoList();
  }

  async function deleteItem(id: number, tagetElement: HTMLLIElement) {
    setSyncStateIcon("pending");
    tagetElement.className = "deleting";
    await fetch(`http://localhost:3000/item/${id}`, { method: "DELETE" });
    tagetElement.className = "deleted";
    setTimeout(() => {
      setTodolist(todolist.filter((todo) => todo.id !== id));
      refreshTodoList();
    }, 300);
  }

  const handleRemoveItem = async (event: MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.dataset.id) as number;
    const li = event.currentTarget.closest("li") as HTMLLIElement;
    deleteItem(id, li);
  };

  const handleUpdateItem = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const li = event.currentTarget.closest("li") as HTMLLIElement;
      const input = li.querySelector("input") as HTMLInputElement;
      input.className = "done";
      input.blur();
      const value = event.currentTarget.value;
      const id = Number(event.currentTarget.dataset.id) as number;
      updateItem(id, value);  
    }
  };

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const li = event.currentTarget.closest("li") as HTMLLIElement;
    const input = li.querySelector("input") as HTMLInputElement;
    input.classList.add("done");
    updateItem(Number(event.currentTarget.dataset.id), input.value);
  }

  function handleEdit(event: MouseEvent<HTMLButtonElement>) {
    const li = event.currentTarget.closest("li") as HTMLLIElement;
    const input = li.querySelector("input") as HTMLInputElement;
    input.className = "editing";
    input.focus();
  }

  return (
    <>
      <ul>
        {todolist.map((todo) => (
          <li
            key={todo.id}
            data-id={todo.id}
            className={todo.id < 0 ? "pending" : "synced"}
          >
            <input
              data-id={todo.id}
              defaultValue={todo.text}
              onKeyDown={handleUpdateItem}
              onBlur={handleBlur}
            />
            <div className="actions">
              <button
                data-id={todo.id}
                className="editBtn"
                onClick={handleEdit}
              >
                <span>edit</span>
              </button>
              <button
                data-id={todo.id}
                onClick={handleRemoveItem}
                className="deleteBtn"
              >
                <span>delete</span>
              </button>
            </div>
            <p>
              {todo.date === "Agora a pouco"
                ? "Agora a pouco"
                : dateFns.format(dateFns.parseISO(todo.date), "dd/MM - HH:mm")}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
