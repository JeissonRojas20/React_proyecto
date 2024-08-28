import React, { useState, useEffect } from 'react';
import AdministradorActualizarProducto from './actualizar'; // Asegúrate de que la ruta sea correcta
import ConfirmModal from '../../../components/deleteProduct'; // Importa el componente de modal

const AdministradorConsultaProducto = () => {
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle product updates
  const handleProductUpdate = async () => {
    await fetchProducts(); // Refresh products list after update
  };

  // Function to handle product deletion
  const handleProductDelete = async () => {
    try {
      await fetch(`http://localhost:3001/products/${selectedProductId}`, {
        method: 'DELETE',
      });
      await fetchProducts(); // Refresh products list after deletion
      setIsConfirmModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleProductDropdown = () => setProductDropdownOpen(!productDropdownOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const openUpdateForm = (productId) => {
    setSelectedProductId(productId);
    setIsUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateFormOpen(false);
    setSelectedProductId(null);
  };

  const confirmDelete = (productId) => {
    setSelectedProductId(productId);
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral izquierda */}
      <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Solo Electricos</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="/user/admin/welcome"
                className="flex items-center p-2 hover:bg-blue-700 rounded"
              >
                <i className="fas fa-home mr-2"></i>
                Inicio
              </a>
            </li>
            <li>
              <a
                href="/user/admin/users"
                className="flex items-center p-2 hover:bg-blue-700 rounded"
              >
                <i className="fas fa-users mr-2"></i>
                Usuarios
              </a>
            </li>
            <li>
              <div className="relative">
                <button
                  onClick={toggleProductDropdown}
                  className="flex items-center justify-between w-full p-2 bg-blue-700 rounded"
                >
                  <span className="flex items-center">
                    <i className="fas fa-box mr-2"></i>
                    Productos
                  </span>
                  <i className={`fas fa-chevron-down ${productDropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {productDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    <a
                      href="/registroProductoAdmin"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Agregar producto
                    </a>
                    <a
                      href="/consultaProductoAdmin"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Ver productos
                    </a>
                  </div>
                )}
              </div>
            </li>
            <li>
              <a
                href="../../Ventas/consultaVentaAdmin.html"
                className="flex items-center p-2 hover:bg-blue-700 rounded"
              >
                <i className="fas fa-shopping-cart mr-2"></i>
                Ventas
              </a>
            </li>
            <li>
              <a
                href="../../Pedido/consultaPedido.html"
                className="flex items-center p-2 hover:bg-blue-700 rounded"
              >
                <i className="fas fa-truck mr-2"></i>
                Pedidos
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barra superior */}
        <header className="bg-gray-800 shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-100">
              Nombre del administrador
            </h2>
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
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
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${userDropdownOpen ? 'block' : 'hidden'}`}
              >
                <a
                  href="./perfil_administrador.html"
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
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="flex-grow p-4 container mx-auto overflow-y-auto">
          <center>
            <h1 className="text-2xl mb-4 p-4 bg-gray-300 font-bold">
              Nuestros productos
            </h1>
          </center>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                {/* Mostrar imagen del producto */}
                <div className="relative w-full h-32 bg-gray-200 rounded overflow-hidden">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.nombre}</h2>
                <p className="text-gray-700 mb-2">Cantidad: {product.cantidad}</p>
                <p className="text-gray-700 mb-2">Precio: ${product.precio}</p>
                <p className="text-gray-700 mb-4">Descripción: {product.descripcion}</p>
                <div className="flex space-x-2">
                  {/* Botón de editar */}
                  <button
                    onClick={() => openUpdateForm(product.id)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-300 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  {/* Botón de eliminar */}
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-300 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mostrar formulario de actualización */}
          {isUpdateFormOpen && (
            <AdministradorActualizarProducto
              productId={selectedProductId}
              onClose={() => {
                closeUpdateForm();
                handleProductUpdate(); // Refresh the product list after update
              }}
            />
          )}

          {/* Mostrar modal de confirmación */}
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onConfirm={handleProductDelete}
            onCancel={() => setIsConfirmModalOpen(false)}
          />
        </main>
      </div>
    </div>
  );
};

export default AdministradorConsultaProducto;
