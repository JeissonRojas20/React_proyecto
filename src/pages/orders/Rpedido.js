import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Rpedido = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        num: '',
        adress: '',
        paymentMethod: '',
    });

    const [availableProducts, setAvailableProducts] = useState([
        { id: 1, name: 'Martillo', unitPrice: 20000, quantityAvailable: 50 },
        // Puedes agregar más productos disponibles aquí
    ]);

    const [orderedProducts, setOrderedProducts] = useState([]);
    const [tempQuantity, setTempQuantity] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleQuantityChange = (e, productId) => {
        setTempQuantity(prevState => ({
            ...prevState,
            [productId]: e.target.value
        }));
    };

    const handleProductAdd = (product) => {
        const quantity = parseInt(tempQuantity[product.id], 10) || 0;
        if (quantity > 0 && quantity <= product.quantityAvailable) {
            setOrderedProducts(prevProducts => [
                ...prevProducts,
                { ...product, quantityToAdd: quantity }
            ]);
            setAvailableProducts(prevProducts =>
                prevProducts.map(p =>
                    p.id === product.id
                        ? { ...p, quantityAvailable: p.quantityAvailable - quantity }
                        : p
                )
            );
            setTempQuantity(prevState => ({
                ...prevState,
                [product.id]: ''
            }));
        } else {
            alert('Cantidad no válida o excede la cantidad disponible.');
        }
    };

    const handleProductChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProducts = [...orderedProducts];
        updatedProducts[index] = {
            ...updatedProducts[index],
            [name]: value
        };
        setOrderedProducts(updatedProducts);
    };

    const handleRemoveProduct = (index) => {
        const removedProduct = orderedProducts[index];
        const updatedProducts = orderedProducts.filter((_, i) => i !== index);
        setOrderedProducts(updatedProducts);
        setAvailableProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === removedProduct.id
                    ? { ...p, quantityAvailable: p.quantityAvailable + removedProduct.quantityToAdd }
                    : p
            )
        );
    };

    const getTotalPrice = () => {
        return orderedProducts.reduce((total, product) => total + (product.unitPrice * product.quantityToAdd), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calcular el valor total del pedido
        const totalPrice = getTotalPrice();

        // Obtener la fecha y hora actuales en formato "día mes año hora:minuto"
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Excluir datos no deseados y preparar los datos para enviar
        const productsToSend = orderedProducts.map(({ id, name, unitPrice, quantityToAdd }) => ({
            id,
            name,
            unitPrice,
            quantityToAdd
        }));

        try {
            const response = await fetch('http://localhost:3001/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    products: productsToSend,
                    totalPrice, // Incluir el totalPrice en la solicitud
                    orderDate: formattedDate // Incluir la fecha y hora en el pedido
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Pedido registrado:', result);
                alert('Pedido registrado con éxito');
                setFormData({
                    name: '',
                    num: '',
                    adress: '',
                    paymentMethod: '',
                });
                setOrderedProducts([]);
                navigate('/user/cpedido');
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
        <div className="flex-1 p-10">
            {/* Tabla de productos disponibles */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Productos Disponibles</h2>
                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">ID Producto</th>
                            <th className="border border-gray-300 p-2">Nombre del producto</th>
                            <th className="border border-gray-300 p-2">Cantidad disponible</th>
                            <th className="border border-gray-300 p-2">Cantidad a agregar</th>
                            <th className="border border-gray-300 p-2">Precio unitario</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableProducts.map(product => (
                            <tr key={product.id}>
                                <td className="border border-gray-300 p-2">{product.id}</td>
                                <td className="border border-gray-300 p-2">{product.name}</td>
                                <td className="border border-gray-300 p-2">{product.quantityAvailable}</td>
                                <td className="border border-gray-300 p-2">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Cantidad a agregar"
                                        className="border p-1 w-full"
                                        value={tempQuantity[product.id] || ''}
                                        onChange={(e) => handleQuantityChange(e, product.id)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">{product.unitPrice}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded flex items-center"
                                        onClick={() => handleProductAdd(product)}
                                    >
                                        Agregar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Formulario de datos del usuario */}
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <h2 className="text-xl font-bold mb-4">Datos usuario</h2>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Nombre usuario"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <input
                        type="text"
                        id="num"
                        name="num"
                        required
                        placeholder="Teléfono usuario"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        onChange={handleChange}
                        value={formData.num}
                    />
                    <input
                        type="text"
                        id="adress"
                        name="adress"
                        required
                        placeholder="Dirección usuario"
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        onChange={handleChange}
                        value={formData.adress}
                    />
                    <select
                        name="paymentMethod"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        onChange={handleChange}
                        value={formData.paymentMethod}
                    >
                        <option value="">Método de pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                    </select>
                    <button
                        className="w-full p-2 bg-blue-500 text-white rounded"
                        onClick={handleSubmit}
                    >
                        Registrar pedido
                    </button>
                </div>

                {/* Tabla de productos en el pedido */}
                <div className="w-1/2">
                    <h2 className="text-xl font-bold mb-4">Productos en el pedido</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2">Nombre producto</th>
                                <th className="border border-gray-300 p-2">Cantidad agregar</th>
                                <th className="border border-gray-300 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderedProducts.map((product, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-2">{product.name}</td>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="number"
                                            min="0"
                                            name="quantityToAdd"
                                            value={product.quantityToAdd}
                                            placeholder="Cantidad agregar"
                                            className="border p-1 w-full"
                                            onChange={(e) => handleProductChange(e, index)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2 flex space-x-2">
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded flex items-center"
                                            onClick={() => handleRemoveProduct(index)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Mostrar el valor total */}
                    <div className="mt-4 text-xl font-bold">
                        Total: ${getTotalPrice()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rpedido;
