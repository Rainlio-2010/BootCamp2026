import { CreateProductElement } from "./todoitem.js";

export const renderToDolist = (todos, onDelete, onToggle) => {
    const listContainer = document.createElement("div");
    listContainer.className = "todo-list-items";

    todos.forEach(todoItem => {
        const item = CreateProductElement(todoItem, onDelete, onToggle);
        listContainer.appendChild(item);
    });

    return listContainer;
}