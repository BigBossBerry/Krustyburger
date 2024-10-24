import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Pedidos = ({ userType }) => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pedidos');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar los pedidos:', err);
      }
    };
    fetchPedidos();
  }, []);

  const handleAddToPedido = (producto) => {

    setPedidos([...pedidos, producto]);
  };

  return (
    <div>
      <Navbar userType={userType} />
      <h1>Realizar Pedido</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido._id}>
              {pedido.producto.nombre} - {pedido.cantidad}
              <button onClick={() => handleAddToPedido(pedido.producto)}>Añadir al Pedido</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pedidos;
