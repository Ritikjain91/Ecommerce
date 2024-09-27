import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: '',
    password: ''
  };

  const onSubmit = (values) => {
    const storedData = JSON.parse(localStorage.getItem('userData')); 

    if (storedData && storedData.username === values.username && storedData.password === values.password) {
      localStorage.setItem('username', values.username); 
      alert('Login successful');
      navigate('/products'); 
      window.location.reload();
    } else {
      alert('Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h3 className="text-center mb-4">Login</h3>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form>
                <div className="form-group mb-3">
                  <Field
                    className="form-control"
                    name="username"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mb-3 position-relative">
                  <Field
                    className="form-control"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                  <span
                    className="position-absolute end-0 top-0 mt-2 me-2"
                    style={{ cursor: 'pointer' }}
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </span>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
