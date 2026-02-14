import { formatCurrency } from "../utils/format.js";

export const createProductItem = (product, onDelete) => {
    const productItem = document.createElement("div");

    productItem.className = "product-item card mb-2";

    productItem.innerHTML = `
        <div class="card-body d-flex justify-content-between align-items-center">
            <span class="fw-bold">${product.name}</span>
            <span class="text-success">${formatCurrency(product.price)}</span>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </div>
    `;

    const deleteBtn = productItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => onDelete(product.id));

    return productItem;
};
