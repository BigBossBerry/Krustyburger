import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUserType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    setUserType(null);
    navigate('/');
  }, [navigate, setUserType]);

  return null;
};

export default Logout;
