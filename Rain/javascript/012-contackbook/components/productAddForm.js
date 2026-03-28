export const AddForm = (onAdd) => {
    const form = document.createElement("form");
    form.innerHTML = `
    <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name">
    </div>
    <div>
        <label for="contactNumber">Contact Number</label>
        <input type="text" id="contactNumber" name="contactNumber">
    </div>
    <button type="submit">Add</button>
    `;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const contactNumberInput = document.getElementById("contactNumber");
        const name = nameInput.value;
        const contactNumber = contactNumberInput.value;

        if (name === "" || contactNumber === "") {
            alert("Please fill in all the fields");
            return;
        } else if (contactNumber.length < 11) {
            alert("Please input at least 11 umbers in the contact field");
            return;
        }

        onAdd(name, contactNumber);

        nameInput.value = "";
        contactNumberInput.value = "";
    });

    return form;
}
