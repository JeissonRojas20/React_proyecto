import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch all users from the API
        axios.get('http://localhost:3001/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    // Filter users based on the search term
    const filteredUsers = users.filter(user =>
        `${user.name} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Handle user deletion
    const handleDelete = (userId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            axios.delete(`http://localhost:3001/users/${userId}`)
                .then(() => {
                    // Remove the user from the state
                    setUsers(users.filter(user => user.id !== userId));
                })
                .catch(error => {
                    console.error('There was an error deleting the user!', error);
                });
        }
    };

    return (
        <div className="flex flex-1">
            {/* Barra lateral */}
            <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-6">Solo Electricos</h1>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/user/admin/welcome" className="flex items-center p-2 hover:bg-blue-700 rounded">
                                <i className="fas fa-home mr-2" />
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <a href="/user/admin/users" className="flex items-center p-2 bg-blue-700 rounded">
                                <i className="fas fa-users mr-2" />
                                Usuarios
                            </a>
                        </li>
                        <li>
                            <a href="/consultaProductoAdmin" className="flex items-center p-2 hover:bg-blue-700 rounded">
                                <i className="fas fa-box mr-2" />
                                Productos
                            </a>
                        </li>
                        <li>
                            <a href="./Ventas/consultaVentaAdmin.html" className="flex items-center p-2 hover:bg-blue-700 rounded">
                                <i className="fas fa-shopping-cart mr-2" />
                                Ventas
                            </a>
                        </li>
                        <li>
                            <a href="./Pedido/consultaPedido.html" className="flex items-center p-2 hover:bg-blue-700 rounded">
                                <i className="fas fa-truck mr-2" />
                                Pedidos
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
            {/* Contenido principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-gray-800 shadow-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-100">Nombre del administrador</h2>
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                id="dropdown-button"
                                className="flex items-center space-x-2 text-gray-100 hover:text-gray-300 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </button>
                            {/* Dropdown */}
                            {isDropdownOpen && (
                                <div id="dropdown-menu" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <Link to="/user/admin/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mis datos</Link>
                                    <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar sesión</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                {/* Contenido de la página */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    <h1 className="text-2xl font-bold mb-6">Usuarios del sistema</h1>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between mb-4">
                            <Link to="/user/admin/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Registrar usuario</Link>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar usuario"
                                    className="border rounded px-3 py-2 pr-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <i className="fas fa-search text-gray-400" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredUsers.map(user => (
                                <div key={user.id} className="border rounded-lg p-4 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full mb-2 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold">{user.name} {user.lastName}</h3>
                                    <p className="text-gray-600 mb-4">{user.rol}</p>
                                    <div className="flex space-x-2">
                                        <Link to={`/user/admin/update/${user.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
