import React from 'react';
import './ProductoCard.css'; 
const ProductoCard = ({ producto }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={producto.foto} alt={producto.nombre} />
      </div>
      <div className="card-text">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <div className="card-price">
          <p>${producto.precio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;