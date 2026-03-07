const STORAGE_KEY = "todo_products";

export const saveToStorage = (products) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const loadFromStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};
