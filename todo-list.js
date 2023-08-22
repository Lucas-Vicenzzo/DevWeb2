let style

function createLinkStyle() {
    if (style) return
    style = document.createElement("link")
    style.rel = "stylesheet"
    style.href = "todo-list.css"
    document.head.append(style)
}

function createAction() {
    const actionBar = document.createElement("div")
    const input = document.createElement("input")
    const addButton = document.createElement("button")
    addButton.textContent = "ADICIONAR"
    actionBar.append(input, addButton)
    actionBar.className = "action-bar"

    return { actionBar, input, addButton }
}

function createList() {
    const list = document.createElement("div")
    list.className = "list"
    return list
}

function createItem(labelText) {
    const item = document.createElement("div")
    const checkbox = document.createElement("input")
    const btDelete = document.createElement("button")
    const label = document.createElement("span")

    checkbox.type = "checkbox"
    label.textContent = labelText
    btDelete.textContent = "Excluir"
    item.append(checkbox, label, btDelete)

    return { item, checkbox, label, btDelete }
}

export default function(rootElement) {
    if (!(rootElement instanceof HTMLElement)) return
    createLinkStyle()
    const { actionBar, addButton, input } = createAction()
    const list = createList()
    rootElement.className = "lucas-todo-list"
    rootElement.append(actionBar, list)

    const addNewItem = () => {
        if (input.value === "") {
            alert('adicione alguma coisa')
            return
        }
        const {item, btDelete} = createItem(input.value)
        input.value = ""
        list.append(item)

        btDelete.addEventListener("click", () => {
            item.remove()
        })
    }

    input.addEventListener("keydown", ({ key }) => key === 'Enter' && addNewItem())

    addButton.addEventListener("click", addNewItem)


};