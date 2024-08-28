import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PaginaPrincipal = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <header className="bg-gray-800 py-4 shadow-md w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg font-bold text-gray-100">Solo Electricos</Link>
            <nav className="flex space-x-4">
              <ul className="flex space-x-4">
                <li><Link to="/" className="text-gray-100 hover:text-gray-300">Inicio</Link></li>
                <li><Link to="/productos" className="text-gray-100 hover:text-gray-300">Productos</Link></li>
                <li><Link to="/nosotros" className="text-gray-100 hover:text-gray-300">Nosotros</Link></li>
              </ul>
            </nav>
            <div className="flex items-center space-x-6">
              <Link to="/carrito" className="flex items-center text-gray-100 hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                Mi Carrito
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-100 hover:text-gray-300 focus:outline-none"
                >
                  <span>Mi Cuenta</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link to="/user/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Registrarme</Link>
                    <Link to="/user/validation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Iniciar sesión</Link>
                  </div>
                )}
              </div>
            </div>
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
                to={`/consultaEspecificaIndex/${product.id}`} 
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
                <li><Link to="/" className="hover:text-gray-300">Inicio</Link></li>
                <li><Link to="/" className="hover:text-gray-300">Productos</Link></li>
                <li><Link to="/" className="hover:text-gray-300">Nosotros</Link></li>
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

export default PaginaPrincipal;
