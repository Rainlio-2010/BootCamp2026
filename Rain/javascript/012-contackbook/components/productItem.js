import { formatContactNumber } from "../utils/format.js";

export const CreateContactElement = (contact, onDelete, onEdit) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
        <h1>${contact.name}</h1>
        <p>${formatContactNumber(contact.contactNumber)}</p>
        <button class="delete-button">Delete</button>
        <a class="btn btn-primary edit-button" data-bs-toggle="offcanvas" href="#offcanvasRight" role="button" aria-controls="offcanvasRight">
  Edit</a>
    </div>
    `;

    const deleteButton = div.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        onDelete(contact.id);
    });

    const editButton = div.querySelector(".edit-button");
    if (onEdit) {
        editButton.addEventListener("click", () => {
            onEdit(contact);
        });
    }

    return div;
}