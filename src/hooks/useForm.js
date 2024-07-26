import React from 'react';
import { useState, useRef } from 'react';

const useForm = (initialState, callback, validate) => {
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

  const getRef = (name) => {
    if (!refs.current[name]) {
      refs.current[name] = createRef();
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
