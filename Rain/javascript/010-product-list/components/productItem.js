import { formatPrice } from "../utils/format.js";

export const CreateProductElement = (product, onDelete) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
        <h1>${product.name}</h1>
        <p>${formatPrice(product.price)}</p>
        <button class="delete-button">Delete</button>
    </div>
    `;

    const deleteButton = div.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        onDelete(product.id);
    });

    return div;
}