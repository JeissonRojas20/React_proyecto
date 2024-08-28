import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const IndexConsultaEspecifica = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [product, setProduct] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setRelatedProducts(data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  const handleProductClick = (productId) => {
    navigate(`/consultaEspecificaCliente/${productId}`); // Navega a la pagina en especifico
    window.scrollTo(0, 0); // Desplaza la página al inicio
  };

  if (!product) return <p>Cargando...</p>;

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
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-gray-100 hover:text-gray-300 focus:outline-none"
                >
                  <span>Mi Cuenta</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {dropdownOpen && (
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
      
      <section className="relative mt-12">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
            <div className="img">
              <div className="img-box h-full max-lg:mx-auto">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="max-lg:mx-auto lg:ml-auto h-80 w-80 object-cover"
                />
              </div>
            </div>
            <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-xl">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{product.nombre}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    $ {parseFloat(product.precio).toFixed(2)}
                  </h6>
                </div>
                <p className="text-gray-500 text-base font-normal mb-5">
                  {product.descripcion} <a href="/" className="text-indigo-600">Más info....</a>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                  <div className="flex sm:items-center sm:justify-center w-full">
                    <button 
                      onClick={decrementQuantity} 
                      className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                    >
                      <svg className="stroke-gray-900 group-hover:stroke-black" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                      placeholder="1"
                      value={quantity}
                      readOnly
                    />
                    <button 
                      onClick={incrementQuantity} 
                      className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                    >
                      <svg className="stroke-gray-900 group-hover:stroke-black" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                    <svg className="stroke-indigo-600" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H12.2198C12.7197 15.5833 13.4817 15.5833 14.042 15.1605C14.6024 14.7377 14.7788 14.0221 15.035 12.5908L16.3518 5.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="pl-3">Agregar al carrito</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center">Otros productos...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-gray-200 p-4 text-center cursor-pointer hover:bg-gray-300 transition-all duration-300"
              onClick={() => handleProductClick(prod.id)}
            >
              <img 
                src={prod.imagen} 
                alt={prod.nombre} 
                className="w-full h-40 object-cover mb-2"
              />
              <p className="text-blue-600 mb-2">{prod.nombre}</p>
              <p className="mb-2">{prod.cantidad} disponible</p>
              <p>$ {parseFloat(prod.precio).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-6 mt-auto">
        <div className="container mx-auto flex flex-wrap justify-between">
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
      </footer>
    </div>
  );
};

export default IndexConsultaEspecifica;
