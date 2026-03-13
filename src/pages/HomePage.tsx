import { useEffect, useState } from "react";
import type { Product } from "../models/Product";

function HomePage() {
    // renderdamine -> esmakordne komponendi pealetulek (nt uuele lehele minnes tehakse üldine lehe renderdus)
    // re-renderdamine -> komponendi HTMLs muutujate olekute muutmine (nt rippmenüüst millegi valimine uuendab ainult valitud asju või menüüd)

    const [products, setProducts] = useState<Product[]>([]);
    // let products = []; JS nii lubab, aga:
    // products = json

    // uef -> enter
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + "/products") // päring aadressil, võtab sisse .env keskkonda pandud info
            .then(res => res.json()) // kogu tagastus
            .then(json => setProducts(json)) // response-i body / sisu
    }, []);

    return (
        <div>
            {products.map(product =>
                <div key={product.id}>
                    {product.name} - {product.price}€ - {product.description}
                </div>)}
        </div>
    )
}

export default HomePage