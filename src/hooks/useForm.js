import React from 'react';
import { useState, useRef } from 'react';

const useForm = (initialState, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const refs = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      callback();
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const getRef = (name) => {
    if (!refs.current[name]) {
      refs.current[name] = React.createRef();
    }
    return refs.current[name];
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    getRef
  };
};

export default useForm;
