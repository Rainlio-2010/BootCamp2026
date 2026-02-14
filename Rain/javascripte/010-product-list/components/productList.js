import { createProductItem } from "./productItem.js";

export const renderProductList = (container, products, onDelete) => {
    container.innerHTML = "";
    products.forEach(product => {
        const item = createProductItem(product, onDelete);
        container.appendChild(item);
    });
};
