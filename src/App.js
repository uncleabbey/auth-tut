import React, { createContext, useReducer, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import People from './containers/People';
import Todos from './containers/Todos';
import Spices from './containers/Spices';
import SpiceDetails from './containers/SpiceDetails';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav';
import AdminDashboard from './containers/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import axios from 'axios';
import config from './utils/config';
import NoAccess from './components/NoAccess';
import Login from './containers/Login';
import Register from './containers/Register';

const initialState = {
  isAuth: false,
  user: {},
  userType: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'login_success':
    case 'fetch_user_success':
      return {
        ...state,
        isAuth: true,
        userType: action.payload.userType,
        user: action.payload.user,
      };
    case 'login_fail':
    case 'logout':
    case 'fetch_user_fail':
      return {
        ...state,
        isAuth: false,
        userType: null,
        user: {},
      };
    default:
      return state;
  }
};
export const userContext = createContext(initialState);
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const url = 'https://bulk-sms-app.herokuapp.com/api/v1/user/current';
        const {
          data: { data },
        } = await axios.get(url, config);
        // console.log(data);
        dispatch({
          type: 'fetch_user_success',
          payload: {
            userType: data.userType,
            user: data.userData,
          },
        });
      } catch (error) {
        dispatch({ type: 'fetch_user_fail' });
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/todos" component={Todos} />
            <Route exact path="/people" component={People} />
            <Route exact path="/spices" component={Spices} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <Route path="/spices/:id" component={SpiceDetails} />
            <Route component={NoAccess} />
          </Switch>
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
