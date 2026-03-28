export const CreateProductElement = (todo, onDelete, onToggle) => {
    const div = document.createElement("div");
    div.className = "todo-item d-flex align-items-center justify-content-between p-2 mb-2 border rounded";

    div.innerHTML = `
    <div>
    <input type="checkbox" name="Item" class ="${todo.statue}">
        <label for="Item">${todo.name}</label>
        <button class="delete-button">Delete</button>
    </div>
    <button class="btn btn-danger btn-sm delete-button">
        <i class="bi bi-trash"></i> Delete
    </button>
    `;

    const checkbox = div.querySelector(".form-check-input");
    checkbox.addEventListener("change", () => {
        onToggle(todo.id);
    });

    const deleteButton = div.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        onDelete(todo.id);
    });

    return div;
};