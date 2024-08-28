import React, { useState } from "react";

const Rventa = () => {
  const [productos, setProductos] = useState([]); // Inicialmente vacío
  const [nuevoProducto, setNuevoProducto] = useState({
    cantidadAgregar: 0,
  });
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [descuento, setDescuento] = useState(''); // Cambiar a string
  const [metodoPago, setMetodoPago] = useState("Tarjeta"); // Valor por defecto

  // Estado del producto predefinido
  const [productoPredefinido, setProductoPredefinido] = useState({
    id: 1,
    nombre: "Martillo",
    cantidad: 80,
    precio: 20000,
  });

  const agregarProducto = () => {
    if (nuevoProducto.cantidadAgregar <= 0) {
      alert("Por favor, ingrese una cantidad válida.");
      return;
    }

    const cantidadAgregar = parseInt(nuevoProducto.cantidadAgregar, 10);

    if (cantidadAgregar > productoPredefinido.cantidad) {
      alert("No se puede agregar más cantidad de la disponible.");
      return;
    }

    // Actualizar el estado del producto predefinido
    setProductoPredefinido((prev) => ({
      ...prev,
      cantidad: prev.cantidad - cantidadAgregar,
    }));

    // Agregar el producto a la lista de productos
    const productoExistente = productos.find((p) => p.nombre === productoPredefinido.nombre);

    if (productoExistente) {
      setProductos(productos.map((p) =>
        p.nombre === productoPredefinido.nombre
          ? { ...p, cantidad: p.cantidad + cantidadAgregar }
          : p
      ));
    } else {
      const nuevoProductoAgregado = {
        id: Date.now(), // Generar un ID único
        nombre: productoPredefinido.nombre,
        cantidad: cantidadAgregar,
        precio: productoPredefinido.precio,
      };
      setProductos([...productos, nuevoProductoAgregado]);
    }

    setNuevoProducto({ cantidadAgregar: 0 });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarEdicion = (id) => {
    const producto = productos.find((p) => p.id === id);
    setEditandoProducto(producto);
  };

  const actualizarCantidad = () => {
    setProductos(productos.map((p) =>
      p.id === editandoProducto.id
        ? { ...p, cantidad: parseInt(editandoProducto.cantidad, 10) || 0 } // Asegurarse de que se maneje 0
        : p
    ));
    setEditandoProducto(null);
  };

  const calcularSubtotal = () => {
    return productos.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    return subtotal - (parseFloat(descuento) || 0); // Restar el descuento del subtotal
  };

  const obtenerFechaHoraActual = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); // Asegurarse de que el día tenga dos dígitos
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11, así que sumamos 1
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const registrarVenta = async () => {
    const venta = {
      descuento: parseFloat(descuento) || 0, // Asegurar que descuento sea un número
      subtotal: calcularSubtotal(),
      total: calcularTotal(),
      metodoPago,
      fechaHora: obtenerFechaHoraActual(),
    };

    try {
      const response = await fetch('http://localhost:3001/venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venta),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la venta');
      }

      alert("Venta registrada con éxito");
      // Opcional: Limpiar campos o realizar otras acciones después del registro
    } catch (error) {
      console.error("Error al registrar la venta", error);
      alert("Error al registrar la venta");
    }
  };

  return (
    <main className="flex-1 p-10">
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID Producto</th>
            <th className="border border-gray-300 p-2">Nombre del producto</th>
            <th className="border border-gray-300 p-2">Cantidad disponible</th>
            <th className="border border-gray-300 p-2">Cantidad agregar</th>
            <th className="border border-gray-300 p-2">Precio unitario</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">{productoPredefinido.id}</td>
            <td className="border border-gray-300 p-2">{productoPredefinido.nombre}</td>
            <td className="border border-gray-300 p-2">{productoPredefinido.cantidad}</td>
            <td className="border border-gray-300 p-2">
              <input
                type="number"
                name="cantidadAgregar"
                placeholder="Cantidad a agregar"
                className="border p-1 w-full"
                value={nuevoProducto.cantidadAgregar}
                onChange={manejarCambio}
              />
            </td>
            <td className="border border-gray-300 p-2">{productoPredefinido.precio}</td>
            <td className="border border-gray-300 p-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={agregarProducto}
              >
                Agregar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 xl:w-1/2 px-4 mb-4">
          <h2 className="text-2xl font-bold mb-4">Registro de Venta</h2>
          <div className="flex flex-col w-full mb-4">
            <div className="flex flex-col space-y-4 mb-4 w-full">
              <div className="space-y-2">
                <label className="block text-gray-700">Descuento (%)</label>
                <input
                  type="number"
                  name="descuento"
                  placeholder="Ingrese el descuento en porcentaje"
                  className="border p-2 px-4 w-full"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)} // Permitir valores vacíos
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700">Subtotal</label>
                <input
                  type="text"
                  placeholder="Subtotal"
                  className="border p-2 px-4 w-full"
                  value={calcularSubtotal().toFixed(2)}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700">Método de Pago</label>
                <select
                  className="border p-2 px-4 w-full"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option>Tarjeta</option>
                  <option>Efectivo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700">Total</label>
                <input
                  type="text"
                  placeholder="Total"
                  className="border p-2 px-4 w-full bg-gray-100"
                  value={calcularTotal().toFixed(2)}
                  readOnly
                />
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 w-full rounded mb-4"
              onClick={registrarVenta}
            >
              Registrar venta
            </button>
          </div>
        </div>

        <div className="md:w-1/2 h-auto">
          <div className="border border-gray-300 p-4 h-full overflow-y-auto">
            <h3 className="font-bold mb-2 text-center">Productos</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Nombre producto</th>
                  <th className="text-left">Cantidad</th>
                  <th className="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">No hay productos agregados</td>
                  </tr>
                ) : (
                  productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>
                        {editandoProducto && editandoProducto.id === producto.id ? (
                          <input
                            type="number"
                            value={editandoProducto.cantidad}
                            onChange={(e) =>
                              setEditandoProducto((prev) => ({
                                ...prev,
                                cantidad: e.target.value || 0, // Manejar entrada vacía
                              }))
                            }
                          />
                        ) : (
                          producto.cantidad
                        )}
                      </td>
                      <td>
                        {editandoProducto && editandoProducto.id === producto.id ? (
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={actualizarCantidad}
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => manejarEdicion(producto.id)}
                          >
                            Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rventa;
