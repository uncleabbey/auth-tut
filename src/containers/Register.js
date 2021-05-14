import axios from 'axios';
import React, { useState, useContext } from 'react';
import TestLoading from '../components/TestLoading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../App';
import { Redirect } from 'react-router-dom';

const Register = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const loginData = {
        email: inputs.email,
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        country: inputs.country,
        phone: inputs.phone,
      };
      const {
        data: { data },
      } = await axios.post(
        'https://bulk-sms-app.herokuapp.com/api/v1/auth/register',
        loginData
      );
      setIsLoading(false);
      toast.success(data.message);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
      toast.error(
        error && error.response && error.response.data
          ? error.response.data.error
          : ''
      );
      dispatch({
        type: 'login_fail',
      });
    }
  };
  if (state.isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={handleSubmit} className="col-sm-4 m-auto">
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">First Name</label>
          <input
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Phone</label>
          <input
            type="text"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Country</label>
          <input
            type="text"
            name="country"
            value={inputs.country}
            maxLength="14"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            minLength="8"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            minLength="8"
            className="form-control"
            name="confirmPassword"
            value={inputs.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block btn-primary btn-login">
            <span>Register</span> <span>{isLoading && <TestLoading />}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
