import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../App';

const Nav = () => {
  const { state, dispatch } = useContext(userContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };
  return (
    <div>
      <nav className="navi">
        <li>
          <NavLink to="/todos">Todo</NavLink>
        </li>
        <li>
          <NavLink to="/people">People</NavLink>
        </li>
        <li>
          <NavLink to="/spices">Spices</NavLink>
        </li>
        <li>
          <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">User Dashboard</NavLink>
        </li>
        {!state.isAuth ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        ) : (
          <li>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </nav>
    </div>
  );
};

export default Nav;
