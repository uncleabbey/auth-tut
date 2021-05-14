import { Redirect, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { userContext } from '../App';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { state } = useContext(userContext);
  // eslint-disable-next-line no-param-reassign
  auth = state;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isAuth) return <Redirect to="/login" />;
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
