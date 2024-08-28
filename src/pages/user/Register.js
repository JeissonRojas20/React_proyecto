import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        num: '',
        gender: 'masculino',
        adress: '',
        email: '',
        password: '',
        confirmPassword: '',
        rol: 'customer'
    });

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
                    confirmPassword: ''
                });
                navigate('/user/validation')
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
        <div>
            <Header />
            <main className="container mx-auto p-4 m-4">

                <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold text-center mb-6">Crea una cuenta</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Ingresa tu nombre</label>
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
                                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Ingresa tus apellidos</label>
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
                                <label htmlFor="num" className="block text-gray-700 text-sm font-bold mb-2">Ingresa tu numero</label>
                                <input
                                    type="number"
                                    id="num"
                                    name="num"
                                    placeholder="Numero telefonico"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={formData.num}
                                />
                            </div>
                            <div className="w-1/2 pl-2">
                                <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Selecciona tu genero</label>
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
                            <label htmlFor="adress" className="block text-gray-700 text-sm font-bold mb-2">Ingresa tu direccion de residencia</label>
                            <input
                                type="text"
                                id="adress"
                                name="adress"
                                placeholder="Direccion"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.adress}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Ingresa tu correo electronico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Correo electronico"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 pr-2">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Ingresa tu contraseña</label>
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
                                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirma la contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirmar contraseña"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                />
                            </div>
                        </div>
                        <div className="text-center mx-auto">
                            <a href="/user/validation" className="text-blue-500 hover:text-blue-700 underline block mb-4">¿Ya tienes una cuenta?</a>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                                Registrarme
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Register;