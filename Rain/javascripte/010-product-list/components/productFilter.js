export const createProductFilter = (filterText, onFilterChange) => {
    const container = document.createElement("div");
    container.className = "input-group mb-3";

    container.innerHTML = `
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input type="text" class="form-control" placeholder="Search products..." value="${filterText}">
    `;

    const input = container.querySelector("input");
    input.addEventListener("input", (e) => onFilterChange(e.target.value));

    return container;
};
