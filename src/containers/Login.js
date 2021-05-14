import axios from 'axios';
import React, { useState, useContext } from 'react';
import TestLoading from '../components/TestLoading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../App';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

const Login = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
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
      };
      const {
        data: { data },
      } = await axios.post(
        'https://bulk-sms-app.herokuapp.com/api/v1/auth/login',
        loginData
      );
      setIsLoading(false);
      dispatch({
        type: 'login_success',
        payload: {
          userType: data.userType,
          user: data.userData,
        },
      });
      localStorage.setItem('token', data.token);
      toast.success('login was successful');
      // props.history.push('/dashboard');
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
  const handleSuccess = (res) => {
    console.log(res);
    const {
      profileObj: { email, givenName, familyName },
    } = res;
    const authData = {
      email,
      firstName: givenName,
      lastName: familyName,
    };
    console.log(authData);
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
      <div className="text-center">
        <GoogleLogin
          clientId="786652250330-rmpqe6g99ot63af6dujrha271u56vlds.apps.googleusercontent.com"
          onSuccess={handleSuccess}
        />
      </div>
      <form onSubmit={handleSubmit} className="col-sm-4 m-auto">
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            value={inputs.email}
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
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block btn-primary btn-login">
            <span>Login</span> <span>{isLoading && <TestLoading />}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
