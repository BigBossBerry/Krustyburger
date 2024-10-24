
import "./Admin.css";
import React from 'react';
import Navbar from '../components/Navbar';
import AdminForm from '../components/AdminForm';
const Admin = ({ userType }) => {
  if (userType !== 'admin') {
    return <p>No tienes acceso a esta página.</p>;
  }

  return (
    <div>
      <Navbar userType={userType} />
      <h1>Panel de Administración</h1>
      <p>Actualización de productos.</p>
      <AdminForm userType={userType} />
    </div>
  );
};

export default Admin;
