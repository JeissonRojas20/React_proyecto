import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de instalar react-router-dom

const ClienteConsulta = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <header className="bg-gray-800 py-4 shadow-md w-full">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/consultaProductoCliente" className="text-lg font-bold text-white">Solo Electricos</a>
          <nav className="hidden md:flex space-x-4">
            <ul className="flex space-x-4">
              <li><a href="/consultaProductoCliente" className="text-white hover:text-gray-300">Inicio</a></li>
              <li><a href="#productosCliente" className="text-white hover:text-gray-300">Productos</a></li>
              <li><a href="/" className="text-white hover:text-gray-300">Nosotros</a></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Carrito de Compras */}
            <a href="/carrito" className="flex items-center space-x-2 text-white hover:bg-gray-300 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.6 3h12.8l.6-3h2M3 3l3 15h12l3-15H3zm3 15a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <span>Carrito</span>
            </a>
            {/* Icono de Usuario */}
            <div className="relative">
              <button 
                id="dropdown-button" 
                onClick={toggleDropdown}
                className="flex items-center space-x-2 py-1 text-white hover:bg-gray-300 rounded-md focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div id="dropdown-menu" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                  <a href="/clienteProfile" className="block px-4 py-2 text-gray-700 hover:bg-gray-300">Mis datos</a>
                  <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar sesión</a>
                </div>
              )}
            </div>
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex justify-center mt-8">
        <input
          type="text"
          placeholder="Buscar producto"
          className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <hr className="mt-4 border-black border-1.5" />

      <section className="p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gray-200 p-3" id='productosCliente'>Nuestros productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/consultaEspecificaCliente/${product.id}`} 
                className="bg-gray-200 p-4 text-center rounded-lg shadow-lg hover:bg-gray-300 cursor-pointer transition"
              >
                <img
                  src={product.imagen} // Asegúrate de que `imagen` sea una URL válida
                  alt={product.nombre}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-bold mb-2">{product.nombre}</h3>
                <p className="mb-2">Cantidad disponible: {product.cantidad}</p>
                <p>$ {parseFloat(product.precio).toFixed(2)}</p>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-4">No hay productos disponibles.</p>
          )}
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Solo eléctricos</h3>
              <p>Tu tienda de confianza para productos eléctricos.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Enlaces rápidos</h3>
              <ul>
                <li><a href="/" className="hover:text-gray-300">Inicio</a></li>
                <li><a href="/" className="hover:text-gray-300">Productos</a></li>
                <li><a href="/" className="hover:text-gray-300">Nosotros</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold mb-2">Contacto</h3>
              <p>Email: info@soloelectricos.com</p>
              <p>Teléfono: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p>&copy; 2024 Solo eléctricos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClienteConsulta;
