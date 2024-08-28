import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WelcomeAdmin = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="flex">
            {/* Barra lateral izquierda */}
            <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-6">Solo Electricos</h1>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/user/admin/welcome" className="flex items-center p-2 bg-blue-700 rounded">
                                <i className="fas fa-house mr-2"></i>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/admin/users" className="flex items-center p-2 hover:bg-blue-700 rounded">
                                <i className="fas fa-users mr-2"></i>
                                Usuarios
                            </Link>
                        </li>
                        <li>
                            <a href="/consultaProductoAdmin" className="flex items-center p-2 hover:bg-blue-700 rounded">
                                <i className="fas fa-box-open mr-2"></i>
                                Productos
                            </a>
                        </li>
                        <li>
                            <a href="./Ventas/consultaVentaAdmin.html" className="flex items-center p-2 hover:bg-blue-700 rounded">
                                <i className="fas fa-shopping-cart mr-2"></i>
                                Ventas
                            </a>
                        </li>
                        <li>
                            <a href="./Pedido/consultaPedido.html" className="flex items-center p-2 hover:bg-blue-700 rounded">
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
                        <h2 className="text-xl font-semibold text-gray-100">Bienvenido, administrador</h2>
                        <div className="relative">
                            <button
                                id="dropdown-button"
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 py-1 text-gray-600 hover:bg-gray-600 rounded-md focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div id="dropdown-menu" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <a href="/user/admin/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mis datos</a>
                                    <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar sesión</a>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Contenido de la página */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Gestionar usuarios</h3>
                            <div className="flex justify-between items-center">
                                <i className="fas fa-users text-6xl text-center"></i>
                                <Link to="/user/admin/users" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ir</Link>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Gestionar productos</h3>
                            <div className="flex justify-between items-center">
                                <i className="fas fa-tools text-6xl text-center" />
                                <a href="/consultaProductoAdmin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ir</a>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Gestionar ventas</h3>
                            <div className="flex justify-between items-center">
                                <i className="fas fa-shopping-bag text-6xl text-center" />
                                <a href="./Ventas/consultaVentaAdmin.html" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ir</a>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4">Gestionar pedidos</h3>
                            <div className="flex justify-between items-center">
                                <i className="fas fa-motorcycle text-6xl text-center" />
                                <a href="./Pedido/consultaPedido.html" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ir</a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WelcomeAdmin;