import { useEffect, useState } from "react";
import type { Product } from "../models/Product";

function HomePage() {
    // renderdamine -> esmakordne komponendi pealetulek (nt uuele lehele minnes tehakse üldine lehe renderdus)
    // re-renderdamine -> komponendi HTMLs muutujate olekute muutmine (nt rippmenüüst millegi valimine uuendab ainult valitud asju või menüüd)

    const [products, setProducts] = useState<Product[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [sort, setSort] = useState("id,asc");

    // let products = []; JS nii lubab, aga:
    // products = json

    // uef -> enter
    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/products?page=${page}&size=${size}&sort=${sort}`) // päring aadressil, võtab sisse .env keskkonda pandud info
            .then(res => res.json()) // kogu tagastus
            .then(json => {
                setProducts(json.content);
                setTotalElements(json.totalElements);
                setTotalPages(json.totalPages);
            }) // response-i body / sisu
    }, [page, size, sort]); // kui siin midagi muutub, laetakse lehe sisu uuesti, tuuakse uue lehe info

    const sizeHandler = (newSize: number) => {
        setSize(newSize);
        setPage(0);
    }

    const sortHandler = (newSort: string) => {
        setSort(newSort);
        setPage(0);
    }

    return (
        <div>
            <div> {page * size + 1} - {(page + 1) * size > totalElements ? totalElements : (page + 1) * size} kuvatud {totalElements}-st</div>

            <select defaultValue={3} onChange={(e) => sizeHandler(Number(e.target.value))} name="selectOption" id="selectOption">
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <button onClick={() => sortHandler("id,asc")}>Sorteeri vanemad enne</button>
            <button onClick={() => sortHandler("id,desc")}>Sorteeri uuemad enne</button>
            <button onClick={() => sortHandler("name,asc")}>Sorteeri A-Z</button>
            <button onClick={() => sortHandler("name,desc")}>Sorteeri Z-A</button>
            <button onClick={() => sortHandler("price,asc")}>Sorteeri hind kasvavalt</button>
            <button onClick={() => sortHandler("price,desc")}>Sorteeri hind kahanevalt</button>

            {products.map(product =>
                <div key={product.id}>
                    {product.name} - {product.price}€ - {product.description}
                </div>)}

            <button disabled={page === 0} onClick={() => setPage(page - 1)}>Eelmine</button>
            <span>{page + 1} / {totalPages}</span>
            <button disabled={page + 1 === totalPages} onClick={() => setPage(page + 1)}>Järgmine</button>
        </div>
    )
}

export default HomePage