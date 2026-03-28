import { AddForm } from "./components/productAddForm.js";
import { ContactFilter } from "./components/productFilter.js";
import { CreateContactElement } from "./components/productItem.js";
let contacts = [
    { id: 1, name: "Rain Lio", contactNumber: "1 123-456-7890" },
    { id: 2, name: "Alice Smith", contactNumber: "1 987-654-3210" },
    { id: 3, name: "Bob Johnson", contactNumber: "1 555-555-5555" }
];
let filterText = "";

let nextId = 4;
let currentEditId = null;

const addFormContainer = document.getElementById("contact-add-form-container");
const filterContainer = document.getElementById("contact-filter-container");
const contactListContainer = document.getElementById("contact-list-container");

const addContact = (name, contactNumber) => {
    const newContact = {
        id: nextId,
        name: name,
        contactNumber: contactNumber
    };
    nextId++;
    contacts.push(newContact);
    renderApp();
}

const deleteContact = (id) => {
    contacts = contacts.filter(c => c.id !== id);
    renderApp();
};

const updateFilter = (text) => {
    filterText = text;
    renderApp();
};

const handleEditClick = (contact) => {
    currentEditId = contact.id;
    document.getElementById("EditName").value = contact.name;
    document.getElementById("EditNumber").value = contact.contactNumber;
};

function renderApp() {
    if (!contactListContainer) return

    contactListContainer.innerHTML = "";
    const filtered = contacts.filter((c) =>
        c.name.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach(contact => {
        const item = CreateContactElement(contact, deleteContact, handleEditClick);
        contactListContainer.appendChild(item);
    });
}

if (addFormContainer) addFormContainer.appendChild(AddForm(addContact));
if (filterContainer) filterContainer.appendChild(ContactFilter(updateFilter));

const saveButton = document.getElementById("saveEditButton");
if (saveButton) {
    saveButton.addEventListener("click", () => {
        if (currentEditId !== null) {
            const newName = document.getElementById("EditName").value;
            const newContactNumber = document.getElementById("EditNumber").value;

            const index = contacts.findIndex(c => c.id === currentEditId);
            if (index !== -1) {
                contacts[index].name = newName;
                contacts[index].contactNumber = newContactNumber;
                renderApp();
            }
            currentEditId = null;
        }
    });
}

renderApp();