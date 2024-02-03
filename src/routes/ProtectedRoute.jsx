import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const authData = JSON.parse(localStorage.getItem('auth'));
  const user = authData ? authData.user : null;

  return user ? <>{children}</> : <Navigate to="/login/" />;
}

export default ProtectedRoute;
