import React from 'react';
import Navbar from '../components/Navbar';

const Home = ({ userType }) => {
  return (
    <div>
      <Navbar userType={userType} />
      <h1>Bienvenido a la Hamburguesería Krusty Burguer</h1>
      <p>Disfruta de nuestras deliciosas hamburguesas.</p>
    </div>
  );
};

export default Home;
