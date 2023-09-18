import { Route, Navigate } from 'react-router-dom';

export const PrivateRoute = (props) => {
  const { isLoggedIn, ...rest } = props;
  
  return (
    <Route 
      {...rest} 
      element={
        isLoggedIn 
          ? rest.element // The component you want to render when logged in
          : <Navigate to="/login" replace />
      }
    />
  );
};
