import ProductItem from './productitem';

function ProductList({ products, onDelete }) {
    //接收一堆product

    //{ products, onDelete } 的意思是：

    //“我知道传进来的是一个对象，请帮我直接把里面的 products 和 onDelete 这两个零件拿出来给我用。”
    return (
        <ul>
            {products.map(item => (
                <li key={item.id}>
                    <ProductItem
                        product={item}
                        onDelete={onDelete}
                    />
                </li>
            ))}
        </ul>
    )
}

export default ProductList;