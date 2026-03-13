import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";

function ManageProducts() {
  // renderdamine -> esmakordne komponendi pealetulek (nt uuele lehele minnes tehakse üldine lehe renderdus)
  // re-renderdamine -> komponendi HTMLs muutujate olekute muutmine (nt rippmenüüst millegi valimine uuendab ainult valitud asju või menüüd)

  const [products, setProducts] = useState<Product[]>([]);
  // let products = []; JS nii lubab, aga:
  // products = json

  // uef -> enter
  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/products") // päring aadressil
      .then(res => res.json()) // kogu tagastus
      .then(json => setProducts(json)) // response-i body / sisu
  }, []);

  const deleteProduct = (productId: number) => {
    fetch(import.meta.env.VITE_BACK_URL + "/products/" + productId, { method: "DELETE" })
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.active}</td>
              <td>{product.stock}</td>
              <td>{product.category?.name}</td> {/* kategooria võib olla puudu vms */}
              <td><button>Edit</button></td>
              <td><button onClick={() =>  deleteProduct(Number(product.id))}>Delete</button></td>
            </tr>)}
        </tbody>
      </table>

    </div>
  )
}

export default ManageProducts