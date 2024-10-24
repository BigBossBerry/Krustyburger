import React from 'react';
import Navbar from '../components/Navbar';
import AdminForm from '../components/AdminForm';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import "./Admin.css";

const Admin = () => {
  const { userType } = useAuth(); // Usa el contexto de autenticación

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
