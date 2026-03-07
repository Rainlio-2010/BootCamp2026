import { AddForm } from "./component/todoaddform.js";
import { ProductFilter } from "./component/todofilter.js";
import { renderToDolist } from "./component/todolist.js";
import { saveToStorage, loadFromStorage } from "./utils/storage.js";

let products = loadFromStorage() || [
    { id: 1, name: "Complete Project", completed: false },
    { id: 2, name: "Review Code", completed: true },
    { id: 3, name: "Meeting with Team", completed: false }
];
let currentFilter = "all";
let nextId = 4;

const addFormContainer = document.getElementById("product-add-form-container");
const filterContainer = document.getElementById("product-filter-container");
const listContainer = document.getElementById("product-list-container");

const addProduct = (name) => {
    const newProduct = {
        id: nextId,
        name: name,
        completed: false
    };
    nextId++;
    products.push(newProduct);
    saveToStorage(products);
    renderApp();
}

const deleteProduct = (id) => {
    products = products.filter(p => p.id !== id);
    saveToStorage(products);
    renderApp();
};

const toggleProduct = (id) => {
    products = products.map(p =>
        p.id === id ? { ...p, completed: !p.completed } : p
    );
    saveToStorage(products);
    renderApp();
};

const updateFilter = (filter) => {
    currentFilter = filter;
    renderApp();
};

function renderApp() {
    addFormContainer.innerHTML = "";
    filterContainer.innerHTML = "";
    listContainer.innerHTML = "";

    addFormContainer.appendChild(AddForm(addProduct));
    filterContainer.appendChild(ProductFilter(currentFilter, updateFilter));

    let filteredProducts = products;
    if (currentFilter === "active") {
        filteredProducts = products.filter(p => !p.completed);
    } else if (currentFilter === "completed") {
        filteredProducts = products.filter(p => p.completed);
    }
    listContainer.appendChild(renderToDolist(filteredProducts, deleteProduct, toggleProduct));
}

renderApp();