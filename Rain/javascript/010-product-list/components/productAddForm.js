export const AddForm = (onAdd) => {
    const form = document.createElement("form");
    form.innerHTML = `
    <div>
        <label for="name">Product Name</label>
        <input type="text" id="name" name="name">
    </div>
    <div>
        <label for="price">Price</label>
        <input type="number" id="price" name="price">
    </div>
    <button type="submit">Add</button>
    `;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const priceInput = document.getElementById("price");
        const name = nameInput.value;
        const price = priceInput.value;

        if (name === "" || price === "") {
            alert("Please fill in all the fields");
            return;
        }

        onAdd(name, parseFloat(price));

        nameInput.value = "";
        priceInput.value = "";
    });

    return form;
}
