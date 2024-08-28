import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AlmacenistaRegistroProducto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cantidad: '',
    precio: '',
    descripcion: '',
    imagen: '', // Campo de imagen añadido
  });
  const [message, setMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const navigate = useNavigate(); // Hook de navegación

  const [userData, setUserData] = useState(null);
  useEffect(() => {
      const fetchUserData = async () => {
          const userId = localStorage.getItem('userId');
          if (userId) {
              try {
                  const response = await fetch(`http://localhost:3001/users/${userId}`);
                  const data = await response.json();
                  setUserData(data);
              } catch (error) {
                  console.error('Error:', error);
              }
          }
      };

      fetchUserData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      nombre: formData.nombre,
      cantidad: parseInt(formData.cantidad),
      precio: parseFloat(formData.precio),
      descripcion: formData.descripcion,
      imagen: formData.imagen, // Incluyendo la URL de la imagen en los datos del producto
    };

    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setMessage('Producto registrado con éxito.');
        navigate('/consultaProductoAlmacenista'); // Redirige a la página de consulta de productos
      } else {
        const errorData = await response.json();
        setMessage(`Error al registrar el producto: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      setMessage(`Error en la solicitud: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral izquierda */}
      <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Solo Electricos</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/user/storekeeper/welcome" className="flex items-center p-2 hover:bg-blue-700 rounded">
                <i className="fas fa-home mr-2"></i>
                Inicio
              </a>
            </li>
            <li>
              <div className="relative">
                <button
                  onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                  className="flex items-center justify-between w-full p-2 bg-blue-700 rounded"
                >
                  <span className="flex items-center">
                    <i className="fas fa-box mr-2"></i>
                    Productos
                  </span>
                  <i className="fas fa-chevron-down"></i>
                </button>
                <div
                  id="product-dropdown-menu"
                  className={`absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${productDropdownOpen ? 'block' : 'hidden'}`}
                >
                  <a href="/registroProductoAlmacenista" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Agregar Producto
                  </a>
                  <a href="/consultaProductoAlmacenista" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Ver Productos
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Barra superior */}
        <header className="bg-gray-800 shadow-md p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">Bienvenido, {userData ? userData.name : 'Cargando...'}</h2>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 py-1 text-gray-600 hover:bg-gray-600 rounded-md focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
            <div
              id="dropdown-menu"
              className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${dropdownOpen ? 'block' : 'hidden'}`}
            >
              <a
                href="./perfil_almacenista.html"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Mis datos
              </a>
              <a
                href="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </a>
            </div>
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="flex-grow p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Registro de Producto</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">Nombre del Producto</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="cantidad">Cantidad</label>
                    <input
                      type="number"
                      id="cantidad"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="precio">Precio de Compra</label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="imagen">Imagen (URL)</label>
                  <input
                    type="text"
                    id="imagen"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-900 transition"
                  >
                    Registrar Producto
                  </button>
                </div>
              </form>
              {message && (
                <div className="mt-4 p-4 text-center text-gray-700">
                  {message}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlmacenistaRegistroProducto;
