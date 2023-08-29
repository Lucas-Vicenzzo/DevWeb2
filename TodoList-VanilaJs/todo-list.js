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
    const editButton = document.createElement("button")

    checkbox.type = "checkbox"
    label.textContent = labelText
    btDelete.textContent = "Excluir"
    editButton.textContent = "Editar"
    item.append(checkbox, label, editButton, btDelete)

    return { item, checkbox, label, btDelete, editButton }
}

function editItem(label, item, editButton) {
    const editInput = document.createElement("input")
    const applyButton = document.createElement("button")
    applyButton.textContent = "Aplicar"
    item.appendChild(editInput)
    item.appendChild(applyButton)
    editButton.style.display = "none"
    applyButton.addEventListener("click", () => {
        if (editInput.value.trim() === "") {
            return
        }
        label.textContent = editInput.value.trim()
        editButton.style.display = "inline"
        applyButton.remove()
        editInput.remove()
        

    })
}

export default function(rootElement) {
    if (!(rootElement instanceof HTMLElement)) return
    createLinkStyle()
    const { actionBar, addButton, input } = createAction()
    const list = createList()
    rootElement.className = "lucas-todo-list"
    rootElement.append(actionBar, list)

    const addNewItem = () => {
        if (input.value.trim() === "") {
            return
        }
        const {item, editButton, btDelete, label} = createItem(input.value.trim())
        list.append(item)

        btDelete.addEventListener("click", () => {
            item.remove()
        })

        editButton.addEventListener("click", () => editItem(label, item, editButton))
    }

    input.addEventListener("keydown", ({ key }) => key === 'Enter' && addNewItem())

    addButton.addEventListener("click", addNewItem)


};