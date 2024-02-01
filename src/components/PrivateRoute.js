import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, token, ...rest }) => {
  return token ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;

