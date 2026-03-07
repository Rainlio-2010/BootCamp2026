export const CreateProductElement = (todo, onDelete, onToggle) => {
    const div = document.createElement("div");
    div.className = "todo-item d-flex align-items-center justify-content-between p-2 mb-2 border rounded";

    div.innerHTML = `
    <div class="d-flex align-items-center gap-2">
        <input type="checkbox" class="form-check-input" ${todo.completed ? "checked" : ""}>
        <label class="form-check-label ${todo.completed ? "text-decoration-line-through text-muted" : ""}">
            ${todo.name}
        </label>
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