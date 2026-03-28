export const ProductList = () => {
    const list = document.createElement("div");
    list.innerHTML = `
    <div>
        <h1>Product List</h1>
    </div>
    `;
    return list;
}