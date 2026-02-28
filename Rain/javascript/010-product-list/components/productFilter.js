export const ProductFilter = (onFilterUpdate) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
        <h1>Product Filter</h1>
        <input type="text" id="filter" placeholder="Filter by name">
    </div>
    `;

    div.querySelector("#filter").addEventListener("input", (e) => {
        onFilterUpdate(e.target.value);
    });

    return div;
}