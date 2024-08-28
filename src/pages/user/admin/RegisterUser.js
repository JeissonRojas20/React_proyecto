import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterUser = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        num: '',
        gender: 'masculino',
        adress: '',
        email: '',
        password: '',
        confirmPassword: '',
        rol: 'customer' // Añadido el campo rol
    });

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const { confirmPassword, ...userDataToSend } = formData;

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataToSend)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Usuario registrado:', result);
                alert('Usuario registrado con éxito');
                setFormData({
                    name: '',
                    lastName: '',
                    num: '',
                    gender: 'masculino',
                    adress: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    rol: 'customer' // Reinicia el rol
                });
                navigate('/user/admin/users'); // Redirige a la lista de usuarios
            } else {
                console.error('Error en el registro');
                alert('Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la conexión');
        }
    };

    return (
        <div className="flex flex-1">
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
                            <Link to="/user/admin/users" className="flex items-center p-2 bg-blue-700 rounded">
                                <i className="fas fa-users mr-2" />
                                Usuarios
                            </Link>
                        </li>
                        <li>
                            <a href="./Productos/Administrador/ConsultaProAdmin.html" className="flex items-center p-2 hover:bg-blue-700 rounded">
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
            <div className="flex-1 flex flex-col overflow-hidden">
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
                                    <Link to="/user/admin/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mis datos</Link>
                                    <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cerrar sesión</a>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <main className="container mx-auto p-4 m-4">
                    <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md">
                        <h2 className="text-2xl font-semibold text-center mb-6">Registrar Usuario</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Nombre"
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        onChange={handleChange}
                                        value={formData.name}
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Apellidos</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Apellidos"
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        onChange={handleChange}
                                        value={formData.lastName}
                                    />
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                    <label htmlFor="num" className="block text-gray-700 text-sm font-bold mb-2">Número Telefónico</label>
                                    <input
                                        type="number"
                                        id="num"
                                        name="num"
                                        placeholder="Número Telefónico"
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        onChange={handleChange}
                                        value={formData.num}
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Género</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        required
                                        onChange={handleChange}
                                        value={formData.gender}
                                    >
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="adress" className="block text-gray-700 text-sm font-bold mb-2">Dirección de Residencia</label>
                                <input
                                    type="text"
                                    id="adress"
                                    name="adress"
                                    placeholder="Dirección"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={formData.adress}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Correo Electrónico"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        onChange={handleChange}
                                        value={formData.password}
                                    />
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirmar Contraseña"
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        onChange={handleChange}
                                        value={formData.confirmPassword}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rol" className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                                <select
                                    id="rol"
                                    name="rol"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={formData.rol}
                                >
                                    <option value="">Escoja un rol</option>
                                    <option value="admin">Administrador</option>
                                    <option value="cashier">Cajero</option>
                                    <option value="storekeeper">Empleado</option>
                                </select>
                            </div>
                            <div className="text-center mx-auto">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                                    Registrar Usuario
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RegisterUser;
