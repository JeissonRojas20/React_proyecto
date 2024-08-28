import React, { useState, useEffect } from 'react';

function Cpedido() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    num: '',
    adress: '',
    paymentMethod: '',
    orderDate: '',
    products: [],
    totalPrice: 0
  });
  const [queryId, setQueryId] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/pedido')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/pedido/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setData(data.filter(order => order.id !== id));
          if (queryResult && queryResult.id === id) {
            setQueryResult(null);
          }
        }
      })
      .catch(error => setError(error));
  };

  const handleEdit = (order) => {
    setEditOrder(order.id);
    setFormData({ ...order });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/pedido/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(updatedOrder => {
        setData(data.map(order => (order.id === updatedOrder.id ? updatedOrder : order)));
        setEditOrder(null);
        if (queryResult && queryResult.id === updatedOrder.id) {
          setQueryResult(updatedOrder);
        }
      })
      .catch(error => setError(error));
  };

  const handleQuery = () => {
    fetch(`http://localhost:3001/pedido/${queryId}`)
      .then(response => response.json())
      .then(order => {
        if (order) {
          setQueryResult(order);
        } else {
          setQueryResult(null);
        }
      })
      .catch(error => setError(error));
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredData = queryResult ? [queryResult] : data;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Datos de Ordenes</h1>

      <div className="mb-6">
        <label className="block mb-2">
          Consultar por ID:
          <input
            type="text"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
          />
        </label>
        <button
          onClick={handleQuery}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {editOrder && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Editar Orden</h2>
          <form>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Número:
              <input
                type="text"
                name="num"
                value={formData.num}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Dirección:
              <input
                type="text"
                name="adress"
                value={formData.adress}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Método de Pago:
              <input
                type="text"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Fecha de Orden:
              <input
                type="text"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Precio Total:
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded-lg mt-4"
            >
              Guardar
            </button>
          </form>
        </div>
      )}

      {filteredData.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Cliente: {order.name}</h2>
          <p className="text-gray-700 mb-1">Número: {order.num}</p>
          <p className="text-gray-700 mb-1">Dirección: {order.adress}</p>
          <p className="text-gray-700 mb-1">Método de Pago: {order.paymentMethod}</p>
          <p className="text-gray-700 mb-3">Fecha de Orden: {order.orderDate || 'No especificada'}</p>
          <h3 className="text-lg font-semibold mb-2">Productos:</h3>
          <ul className="list-disc pl-5 mb-4">
            {order.products.map((product) => (
              <li key={product.id} className="mb-1">
                {product.name} - Precio Unitario: ${product.unitPrice} - Cantidad: {product.quantityToAdd}
              </li>
            ))}
          </ul>
          <p className="font-bold">Total: ${order.totalPrice}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleEdit(order)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Modificar
            </button>
            <button
              onClick={() => handleDelete(order.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cpedido;

