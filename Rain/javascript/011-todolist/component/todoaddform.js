export const AddForm = (onAdd) => {
    const form = document.createElement("form");
    form.className = "mb-4";

    form.innerHTML = `
    <div class="input-group">
        <input type="text" id="todo-input" class="form-control" placeholder="Add a new task..." aria-label="New task">
        <button class="btn btn-primary" type="submit">Add Task</button>
    </div>
    `;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("#todo-input");
        const name = input.value.trim();

        if (name === "") {
            alert("Please fill in all the fields");
            return;
        }

        onAdd(name);
        input.value = "";
    });

    return form;
}