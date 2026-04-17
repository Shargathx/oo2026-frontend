import React, { useState } from 'react'

function Cart() {
  const [orderRows, setOrderRow] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  return (
    <div>
      {orderRows.map(orderRow =>
        <div key={orderRow.product.id}>
          <div>{orderRow.product.name}</div>
          <div>{orderRow.product.price} €</div>
          <div>{orderRow.product.quantity} tk</div>
          <div>{orderRow.product.price * orderRow.product.quantity} €</div>
          <button>X</button>
        </div>
      )}
    </div>
  )
}

export default Cart