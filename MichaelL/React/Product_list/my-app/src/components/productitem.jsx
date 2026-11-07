// function productitem() {
//     const product = {
//         id: "1",
//         product_name: "Apple Macbook",
//         product_price: "1999.99$",
//         delete_button: <button>delete</button>


//     }
// }

// const listItems = productitem.map(product =>
//     <li key={productitem.id}>
//         {productitem.product_name}
//         {productitem.product_price}
//         {productitem.delete_button}
//     </li>
// );

// return (
//     <ul>{listItems}</ul>
// );


function ProductItem({ product, onDelete }) {
    //product是一个object 所以用{}， onDelete是函数 所以用（）
    const formattedPrice =
        typeof product.price === 'number'
            ? product.price.toFixed(2)
            : product.price;
    return (
        <div className="card mb-2 shadow-sm border-0 bg-light">
            <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="card-title mb-0">{product.name}</h5>
                    <small className="text-success fw-bold">${formattedPrice}</small>
                </div>
                <button
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    onClick={() => onDelete(product.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ProductItem;