import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import './Pedidos.css';

const Pedidos = ({ userType }) => {
  const { user } = useAuth(); // Usa el contexto de autenticación para obtener el usuario
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const [cantidades, setCantidades] = useState({}); // Objeto para almacenar las cantidades de cada producto
  const [selectedProductos, setSelectedProductos] = useState({}); // Objeto para almacenar el producto seleccionado en cada categoría
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/productos`);
        setProductos(response.data.productos);
        const categoriasUnicas = [...new Set(response.data.productos.map(producto => producto.categoria))];
        setCategorias(categoriasUnicas);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar los productos:', err);
      }
    };
    fetchProductos();
  }, []);

  const handleProductoSeleccionado = (categoria, productoId) => {
    const productoSeleccionado = productos.find(producto => producto._id === productoId);
    setSelectedProductos((prevSelectedProductos) => ({
      ...prevSelectedProductos,
      [categoria]: productoSeleccionado,
    }));
  };

  const handleCantidadChange = (productoId, cantidad) => {
    setCantidades((prevState) => ({ ...prevState, [productoId]: parseInt(cantidad) || 0 }));
  };

  const handleAddToPedido = (categoria) => {
    const producto = selectedProductos[categoria];
    const cantidad = cantidades[producto._id] || 0;

    if (producto && cantidad > 0) {
      setPedidos((prevPedidos) => [
        ...prevPedidos,
        { ...producto, cantidad }
      ]);

      setCantidades((prevCantidades) => ({ ...prevCantidades, [producto._id]: 0 }));
      setSelectedProductos((prevSelectedProductos) => ({ ...prevSelectedProductos, [categoria]: null }));
    }
  };

  const handleRemoveFromPedido = (index) => {
    setPedidos((prevPedidos) => prevPedidos.filter((_, i) => i !== index));
  };

  const handleSubmitPedido = () => {
    const total = pedidos.reduce((sum, pedido) => sum + pedido.precio * pedido.cantidad, 0);
    const nuevoPedido = { cliente: 'idCliente', productos: pedidos, total };

    setMensaje('Procesando tu pedido...');
    setTimeout(() => {
      setMensaje('Imprimiendo ticket para el cliente...');
      setTimeout(() => {
        setMensaje('Imprimiendo comanda para la cocina...');
        setTimeout(() => {
          setMensaje('Gracias por confiar en nosotros. ¡Esperamos verte pronto!');
          setTimeout(() => {
            setMensaje('Estas funcionalidades están siendo implementadas.');
            setTimeout(() => {
              window.location.href = '/Inicio';
            }, 5000);
          }, 5000);
        }, 5000);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="pedidos-container">
      <Navbar userType={userType} />
      <div className="contenido-pedidos">
        <h1 className="titulo-pedidos">Realizar Pedido</h1>
        <p className="presentacion">Hola {user?.name}, estás en el área de pedidos. ¡Elige tus productos favoritos y realiza tu pedido!</p>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <h2>Productos Disponibles</h2>
            {categorias.map((categoria) => (
              <div key={categoria}>
                <h3>{categoria}</h3>
                <select
                  onChange={(e) => handleProductoSeleccionado(categoria, e.target.value)}
                  value={selectedProductos[categoria]?._id || ""}
                >
                  <option value="">Selecciona un producto</option>
                  {productos
                    .filter((producto) => producto.categoria === categoria)
                    .map((producto) => (
                      <option key={producto._id} value={producto._id}>
                        {producto.nombre} - {producto.precio}€
                      </option>
                    ))}
                </select>
                {selectedProductos[categoria] && (
                  <div className="cantidad-container">
                    <label>Cantidad:</label>
                    <input
                      type="number"
                      min="0"
                      value={cantidades[selectedProductos[categoria]._id] || 0}
                      onChange={(e) => handleCantidadChange(selectedProductos[categoria]._id, e.target.value)}
                    />
                    <button className="add-button" onClick={() => handleAddToPedido(categoria)}>Añadir</button>
                  </div>
                )}
              </div>
            ))}
            <h2>Carrito</h2>
            <ul>
              {pedidos.map((pedido, index) => (
                <li key={index}>
                  {pedido.nombre} - {pedido.cantidad} x {pedido.precio}€
                  <button className="remove-button" onClick={() => handleRemoveFromPedido(index)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <h3>Total: {pedidos.reduce((sum, pedido) => sum + pedido.precio * pedido.cantidad, 0)}€</h3>
            {pedidos.length > 0 && <button className="submit-button" onClick={handleSubmitPedido}>Realizar Pedido</button>}
            {mensaje && <p className={mensaje.includes('implementadas') ? 'mensaje-rojo' : ''}>{mensaje}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Pedidos;
