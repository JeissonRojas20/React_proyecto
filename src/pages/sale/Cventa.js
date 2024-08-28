import React, { useState, useEffect } from 'react';

function Cventa() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    descuento: 0,
    subtotal: 0,
    total: 0,
    metodoPago: '',
    fechaHora: ''
  });
  const [queryId, setQueryId] = useState('');
  const [queryResult, setQueryResult] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/venta')
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
    fetch(`http://localhost:3001/venta/${formData.id}`, {
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
    fetch(`http://localhost:3001/venta/${queryId}`)
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
      <h1 className="text-3xl font-bold mb-6">Datos de Ventas</h1>

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
          <h2 className="text-xl font-semibold mb-2">Editar Venta</h2>
          <form>
            <label className="block mb-2">
              Descuento:
              <input
                type="number"
                name="descuento"
                value={formData.descuento}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Subtotal:
              <input
                type="number"
                name="subtotal"
                value={formData.subtotal}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Total:
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Método de Pago:
              <input
                type="text"
                name="metodoPago"
                value={formData.metodoPago}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="block mb-2">
              Fecha y Hora:
              <input
                type="text"
                name="fechaHora"
                value={formData.fechaHora}
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
          <h2 className="text-xl font-semibold mb-2">ID: {order.id}</h2>
          <p className="text-gray-700 mb-1">Descuento: ${order.descuento}</p>
          <p className="text-gray-700 mb-1">Subtotal: ${order.subtotal}</p>
          <p className="text-gray-700 mb-1">Total: ${order.total}</p>
          <p className="text-gray-700 mb-1">Método de Pago: {order.metodoPago}</p>
          <p className="text-gray-700 mb-3">Fecha y Hora: {order.fechaHora}</p>
        </div>
      ))}
    </div>
  );
}

export default Cventa;


