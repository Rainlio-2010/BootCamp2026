export const createProductAddForm = (onAdd) => {
    const form = document.createElement("form");
    form.className = "row g-3 mb-4 p-3 border rounded bg-light";

    form.innerHTML = `
        <div class="col-md-5">
            <label class="form-label">Product Name</label>
            <input type="text" class="form-control" name="name" required>
        </div>
        <div class="col-md-5">
            <label class="form-label">Price</label>
            <input type="number" class="form-control" name="price" min="0" step="0.01" required>
        </div>
        <div class="col-md-2 d-flex align-items-end">
            <button type="submit" class="btn btn-primary w-100">Add</button>
        </div>
    `;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get("name").trim();
        const price = parseFloat(formData.get("price"));

        if (name && !isNaN(price) && price >= 0) {
            onAdd({
                name,
                price
            });
            form.reset();
        } else {
            alert("Please enter a valid name and price.");
        }
    });

    return form;
};
