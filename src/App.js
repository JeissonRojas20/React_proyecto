import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductoForm from './pages/products/admin/registro';
import AdministradorConsultaProducto from './pages/products/admin/consulta';
import AdministradorActualizarProducto from './pages/products/admin/actualizar';
import AlmacenistaActualizarProducto from './pages/products/almacenista/actualizar';
import AlmacenistaConsultaProducto from './pages/products/almacenista/consulta';
import AlmacenistaRegistroProducto from './pages/products/almacenista/registro';
import CajeroConsulta from './pages/products/cajero/consulta';
import CajeroConsultaEspecifica from './pages/products/cajero/consultaEspecifica';
import ClienteConsulta from './pages/products/cliente/consulta';
import ClienteConsultaEspecifica from './pages/products/cliente/consultaEspecifica';
import PaginaPrincipal from './pages/products/index/consulta';
import IndexConsultaEspecifica from './pages/products/index/consultaEspecifica';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import { UserProvider} from './context/UserContext';
import UserProfile from './pages/user/customer/UserProfile';
import WelcomeCashier from './pages/user/cashier/WelcomeCashier';
import WelcomeAdmin from './pages/user/admin/WelcomeAdmin';
import AdminUsers from './pages/user/admin/AdminUsers';
import RegisterUser from './pages/user/admin/RegisterUser';
import UpdateUserForm from './pages/user/admin/UpdateUserForm';
import WelcomeStorekeeper from './pages/user/storekeeper/WelcomeStorekeeper';
import Rpedido from './pages/orders/Rpedido';
import Cpedido from './pages/orders/Cpedido';
import Rventa from './pages/sale/Rventa';
import Cventa from './pages/sale/Cventa';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <UserProvider>
        <Router>
            <Routes>
              <Route path="/registroProductoAdmin" element={<ProductoForm />} />
              <Route path="/consultaProductoAdmin" element={<AdministradorConsultaProducto />} />
              <Route path="/actualizarProductoAdmin" element={<AdministradorActualizarProducto />} />
              <Route path="/consultaProductoAlmacenista" element={<AlmacenistaConsultaProducto />} />
              <Route path="/actualizarProductoAlmacenista" element={<AlmacenistaActualizarProducto />} />
              <Route path="/registroProductoAlmacenista" element={<AlmacenistaRegistroProducto />} />
              <Route path="/consultaProductoCajero" element={<CajeroConsulta />} />
              <Route path="/consultaEspecificaCajero/:id" element={<CajeroConsultaEspecifica />} />
              <Route path="/consultaProductoCliente" element={<ClienteConsulta />} />
              <Route path="/consultaEspecificaCliente/:id" element={<ClienteConsultaEspecifica />} />
              <Route path="/" element={<PaginaPrincipal />} />
              <Route path="/consultaEspecificaIndex/:id" element={<IndexConsultaEspecifica />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/user/validation" element={<Login />} />
              <Route path="/clienteProfile" element={<UserProfile />} />
              <Route path="/user/cashier/welcome" element={<WelcomeCashier />} />
              <Route path="/user/admin/welcome" element={<WelcomeAdmin />} />
              <Route path="/user/admin/users" element={<AdminUsers />} />
              <Route path="/user/admin/register" element={<RegisterUser />} />
              <Route path="/user/admin/update/:userId" element={<UpdateUserForm />} />
              <Route path="/user/storekeeper/welcome" element={<WelcomeStorekeeper />} />
              <Route path='/user/rpedido' element={<Rpedido />}  />
              <Route path='/user/cpedido' element={<Cpedido />}  />
              <Route path='/user/rventa' element={<Rventa />}  />
              <Route path='/user/cventa' element={<Cventa />}  />
              <Route path='/cart' element={<CartPage />}  />
            </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

