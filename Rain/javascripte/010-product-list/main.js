import { createProductAddForm } from "./components/productAddForm.js";
import { createProductFilter } from "./components/productFilter.js";
import { renderProductList } from "./components/productList.js";


let products = [
    { id: 1, name: "Apple", price: 1.25 },
    { id: 2, name: "Banana", price: 0.75 },
    { id: 3, name: "Cherry", price: 2.50 }
];
let filterText = "";


const addFormContainer = document.getElementById("product-add-form-container");
const filterContainer = document.getElementById("product-filter-container");
const listContainer = document.getElementById("product-list-container");


const addProduct = (newProduct) => {
    const product = {
        id: Date.now(),
        ...newProduct
    };
    products.push(product);
    renderApp();
};

const deleteProduct = (id) => {
    products = products.filter(p => p.id !== id);
    renderApp();
};

const setFilterText = (text) => {
    filterText = text;
    renderApp();
};


const renderApp = () => {

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(filterText.toLowerCase())
    );
    renderProductList(listContainer, filteredProducts, deleteProduct);
};


const init = () => {


    addFormContainer.innerHTML = "";
    addFormContainer.appendChild(createProductAddForm(addProduct));

    filterContainer.innerHTML = "";
    filterContainer.appendChild(createProductFilter(filterText, setFilterText));


    renderApp();
};

init();
