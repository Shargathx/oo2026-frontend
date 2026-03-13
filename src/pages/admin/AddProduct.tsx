import { useEffect, useState } from 'react';
import type { Product } from '../../models/Product';
import type { Category } from '../../models/Category';

function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    active: false,
    stock: 0,
    category: {
      id: 0,
    }
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json()
      })
      .then(data => setCategories(data));
  }, []);

  const addProduct = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(() => alert("Toode lisatud!"));
  };

  return (
    <div>
      <label>Name</label> <br />
      <input onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} type="text" /> <br />

      <label>Description</label> <br />
      <input onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} type="text" /> <br />

      <label>Price</label> <br />
      <input onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} type="number" /> <br />

      <label>Active</label> <br />
      <input onChange={(e) => setNewProduct({ ...newProduct, active: e.target.checked })} type="checkbox" /> <br />

      <label>Stock</label> <br />
      <input onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} type="number" /> <br />
      <label>Category</label> <br />
      <select
        value={newProduct.category?.id || ""}
        onChange={e => setNewProduct({ ...newProduct, category: { id: Number(e.target.value) } })}
      >
        <option value="">Select category</option>
        {categories.map(category =>
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        )}
      </select><br /><br />
      {/* <input onChange={(e) => setNewProduct({ ...newProduct, category: { ...newProduct.category, name: e.target.value } })} type="text" /> <br /> */}
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct   