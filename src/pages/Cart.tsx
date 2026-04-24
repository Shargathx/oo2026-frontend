import { useState } from 'react';
import type { OrderRow } from '../models/OrderRow';

function Cart() {
  const [orderRows, setOrderRows] = useState<OrderRow[]>(JSON.parse(localStorage.getItem("cart") || "[]"));

  const deleteFromCart = (index: number) => {
    orderRows.splice(index, 1); // kustutamiseks, esimene nr on mitmenda eseme kustutan, teine nr on mitu tk alates sellest kustutan
    setOrderRows([...orderRows]); // setOrderRow -> HTML-i uuendamiseks. [...] <- (spread operator) mälukoha kustutamiseks
    // setOrderRow(orderRows.slice()); // teine variant update-imiseks
  }

  const decreaseQuantity = (index: number) => {
    const cart = [...orderRows];
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      cart.splice(index, 1);
    }
    // TODO: ei tohi miinusesse minna
    setOrderRows(cart);
    localStorage.set("cart", JSON.stringify(orderRows));
  }

  const increaseQuantity = (index: number) => {
    const cart = [...orderRows];
    cart[index].quantity++;
    setOrderRows(cart);
    localStorage.set("cart", JSON.stringify(orderRows));
  }

  const emptyCart = () => {
    setOrderRows([]);
    // localStorage.set("cart", JSON.stringify([])); // SEE MEETOD ON VALE; AVOID!!!
    localStorage.setItem("cart", "[]");
  }

  const calculateTotal = () => {
    let sum = 0;
    orderRows.forEach(orderRow => sum = sum + orderRow.product.price * orderRow.quantity);
    return sum;
  }

  const makeOrder = () => {
    const payload = orderRows.map(orderRow => ({ productId: orderRow.product.id, quantity: orderRow.quantity })) // asendame andmed, mille BE-i saadame, tuleb ise mappida
    fetch(import.meta.env.VITE_BACK_URL + "/orders?personId=1", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json", // seda automaatselt ei paku, tuleb manuaalselt kirjutada
      }
    }).then(res => res.json())
      .then(json => alert("Lisasid eduka tellimuse ID-ga: " + json.id));
  }

  return (
    <div>
      {orderRows.length > 0 && <button onClick={() => emptyCart()}>Tühjenda</button>}

      {orderRows.length === 0 && <div>Ostukorv on tühi</div>}

      {orderRows.map((orderRow, index) =>
        <div key={orderRow.product.id}>
          <div>{orderRow.product.name}</div>
          <div>{orderRow.product.price} €</div>
          <button onClick={() => increaseQuantity(index)}>+</button>
          <div>{orderRow.quantity} tk</div>
          <button onClick={() => decreaseQuantity(index)}>-</button>
          <div>{orderRow.product.price * orderRow.quantity} €</div>
          <button onClick={() => deleteFromCart(index)}>X</button>
        </div>
      )}

      {orderRows.length > 0 &&
        <>
          <div>Kokku: {calculateTotal()}</div>
          <button onClick={() => makeOrder()}>Telli</button>
          <select name="pakiautomaat" id="pakiautomaatOption">
            <option value="1">Pakiautomaat 1</option>
            <option value="2">Pakiautomaat 2</option>
          </select>
        </>}
    </div>
  )
}

export default Cart

// Tühjendamise funktsioon
// Ütle, kui ostukorv on tühi
// Ostukorvi kogusumma arvutamine
// Backendi uue tellimuse saatmine

// Sign-up --> isiku lisamine + aadress
// Login, ilma tokenita

// ProductDetails
// EditProduct