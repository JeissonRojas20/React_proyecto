import React from "react";

const CartPage =() =>{
    return(
        <div className="flex-grow p-4">
  {/* Header */}
  <h1 className="text-3xl font-bold mb-4">Carrito</h1>
  <div className="flex">
    {/* Cart items */}
    <div className="w-2/3 pr-8">
      <table className="w-full mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left pb-2">Items</th>
            <th className="text-left pb-2">Precio</th>
            <th className="text-left pb-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4">
              <div className="flex items-center">
                <div className="w-16 h-16 border-2 border-gray-300 mr-4" />
                <div>
                  <p className="font-bold">Descripción del producto</p>
                  <p className="text-sm text-gray-600">Producto</p>
                </div>
              </div>
            </td>
            <td className="py-4">$20.00</td>
            <td className="py-4">
              <select className="border p-1">
                <option>1</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {/* Order summary */}
    <div className="w-1/3 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Resumen de la compra</h2>
      <p className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>$0.00</span>
      </p>
      <p className="flex justify-between mb-2">
        <span>IVA</span>
        <span>-</span>
      </p>
      <p className="flex justify-between font-bold mb-4">
        <span>Total</span>
        <span>$0.00</span>
      </p>
      <button className="w-full bg-blue-500 text-white py-2 rounded mb-2">Finalizar compra</button>
      <button className="w-full border border-gray-300 py-2 rounded">Añadir más items</button>
    </div>
  </div>
</div>

    )
}

export default CartPage;