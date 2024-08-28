import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Header from '../../components/Header';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/users');
            const users = await response.json();

            const user = users.find(u => u.email === formData.email && u.password === formData.password);

            if (user) {
                setUser(user);
                localStorage.setItem('userId', user.id); // Guardar ID en almacenamiento local
                alert("Se inició la sesión correctamente");

                switch (user.rol) {
                    case 'admin':
                        navigate('/user/admin/welcome');
                        break;
                    case 'storekeeper':
                        navigate('/user/storekeeper/welcome');
                        break;
                    case 'cashier':
                        navigate('/user/cashier/welcome');
                        break;
                    case 'customer':
                        navigate('/consultaProductoCliente');
                        break;
                    default:
                        navigate('/');
                        break;
                }
            } else {
                setError('Correo electrónico o contraseña incorrectos.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en la conexión. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4">
                <main className="bg-white p-8 rounded shadow-md max-w-md mx-auto m-4">
                    <h2 className="text-xl font-bold mb-6 text-center">Iniciar sesión</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingresar correo electrónico"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-2">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingresar contraseña"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <a href="/user/register" className="text-blue-500 block mb-4">¿No tienes una cuenta?</a>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-4">Iniciar sesión</button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Login;