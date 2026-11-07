import { useState } from 'react';
import ProductList from "./components/productlist";

import ProductFilter from "./components/productfilter";

function App() {
  //初始商品
  const [products, setProducts] = useState([
    { id: 1, name: 'Apple Macbook-Pro', price: 1999.99 },
    { id: 2, name: 'iPhone 90 ProMax', price: 999.00 },
    { id: 3, name: 'AirPods Pro 50', price: 249.50 }
  ]);

  const [productname, setproductname] = useState("")
  const [productprice, setproductprice] = useState("")


  const [filterText, setFilterText] = useState("");
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );


  const handleDelete = (id) => {
    // 过滤掉那个被点击的 id，保留其他的
    const newProducts = products.filter(item => item.id !== id);
    // 重新渲染页面
    setProducts(newProducts);
  };



  const handleAdd = (name, price) => {
    // const formattedPrice = parseFloat(price);
    if (!name || !price) return; // 简单校验，防止添加空商品
    const newProduct = {
      id: Date.now(),
      name: name,
      price: parseFloat(productprice) // 确保价格是数字
    };
    setProducts(prev => [...prev, newProduct]);

    //  自动清空输入框
    setproductname("");
    setproductprice("");
  };


  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Shopping Cart</h1>

      </div>




      <div className="card shadow-sm mb-4 border-0 bg-light">
        <div className="card-body">
          <h5 className="card-title mb-3 text-secondary">Add New Item</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={productname}
                onChange={(e) => setproductname(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={productprice}
                onChange={(e) => setproductprice(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-success w-100 fw-bold"
                onClick={() => handleAdd(productname, productprice)}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <ProductFilter filterText={filterText} onFilterChange={setFilterText} />
      </div>


      <div className="bg-white rounded shadow-sm p-3">
        <ProductList products={filteredProducts} onDelete={handleDelete} />


      </div>
    </div>
  );
}

export default App;
