import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Form as BootstrapForm, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password too short').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = (values) => {
    localStorage.setItem('userData', JSON.stringify(values));
    alert('Sign up successful');
  };

  return (
    <Container className="mt-5">
      <h2>Sign Up</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ touched, errors }) => (
          <Form>
            {/* Username Field */}
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Username</BootstrapForm.Label>
              <Field
                name="username"
                as={BootstrapForm.Control}
                type="text"
                isInvalid={touched.username && errors.username}
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </BootstrapForm.Group>

            {/* Email Field */}
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field
                name="email"
                as={BootstrapForm.Control}
                type="email"
                isInvalid={touched.email && errors.email}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>

            {/* Password Field with Eye Icon */}
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Password</BootstrapForm.Label>
              <InputGroup>
                <Field
                  name="password"
                  as={BootstrapForm.Control}
                  type={showPassword ? 'text' : 'password'} // Toggle password visibility
                  isInvalid={touched.password && errors.password}
                  placeholder="Enter your password"
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle Icon */}
                </InputGroup.Text>
              </InputGroup>
              <ErrorMessage name="password" component="div" className="text-danger" />
            </BootstrapForm.Group>

            {/* Confirm Password Field with Eye Icon */}
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
              <InputGroup>
                <Field
                  name="confirmPassword"
                  as={BootstrapForm.Control}
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle confirm password visibility
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                  placeholder="Confirm your password"
                />
                <InputGroup.Text onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle Icon */}
                </InputGroup.Text>
              </InputGroup>
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </BootstrapForm.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default SignUp;
