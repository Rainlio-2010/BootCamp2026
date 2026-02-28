import { AddForm } from "./components/productAddForm.js";
import { ProductFilter } from "./components/productFilter.js";
import { CreateProductElement } from "./components/productItem.js";

let products = [
    { id: 1, name: "Apple", price: 1.99 },
    { id: 2, name: "Banana", price: 0.99 },
    { id: 3, name: "Orange", price: 1.49 }
];
let filterText = "";

const addFormContainer = document.getElementById("product-add-form-container");
const filterContainer = document.getElementById("product-filter-container");
const productListContainer = document.getElementById("product-list-container");

const addProduct = (name, price) => {
    const maxId = products.length;
    const newproduct = {
        id: maxId + 1,
        name: name,
        price: price
    };

    products.push(newproduct);
    renderApp();
}

const deleteProduct = (id) => {
    products = products.filter(p => p.id !== id);
    renderApp();
};

const updateFilter = (text) => {
    filterText = text;
    renderApp();
};

function renderApp() {
    if (productListContainer) {
        productListContainer.innerHTML = "";
    }

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(filterText.toLowerCase())
    );

    filtered.forEach(product => {
        const item = CreateProductElement(product, deleteProduct);
        productListContainer.appendChild(item);
    });
}

if (addFormContainer) addFormContainer.appendChild(AddForm(addProduct));
if (filterContainer) filterContainer.appendChild(ProductFilter(updateFilter));
renderApp();