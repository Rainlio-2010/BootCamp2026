export const ProductFilter = (currentFilter, onFilterChange) => {
    const filterContainer = document.createElement("div");
    filterContainer.className = "todo-filter d-flex gap-2 justify-content-center mb-4";

    const Namefilter = ["all", "active", "completed"]
    Namefilter.forEach(Namefilter => {
        const button = document.createElement("button")
        button.textContent = Namefilter;

        button.addEventListener("click", () => {
            onFilterChange(Namefilter);
        });

        filterContainer.appendChild(button);
    });

    return filterContainer;
}