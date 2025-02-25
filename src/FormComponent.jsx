import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, setError, clearErrors } from "./redux/formSlice";

import "bootstrap/dist/css/bootstrap.min.css";

const FormComponent  = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formState?.form || {}); 
  const errors = useSelector((state) => state.formState?.errors || {});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let valid = true;
    dispatch(clearErrors());

    if (!formData.firstName || formData.firstName.length > 50) {
      dispatch(setError({ field: "firstName", message: "First Name is required and max 50 characters." }));
      valid = false;
    }
    if (!formData.lastName || formData.lastName.length > 50) {
      dispatch(setError({ field: "lastName", message: "Last Name is required and max 50 characters." }));
      valid = false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      dispatch(setError({ field: "email", message: "Invalid email format." }));
      valid = false;
    }
    if (!formData.password || formData.password.length < 8) {
      dispatch(setError({ field: "password", message: "Password must be at least 8 characters." }));
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      dispatch(setError({ field: "confirmPassword", message: "Passwords must match." }));
      valid = false;
    }
    if (!formData.dob || new Date().getFullYear() - new Date(formData.dob).getFullYear() < 18) {
      dispatch(setError({ field: "dob", message: "You must be at least 18 years old." }));
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      console.log("Form Data Submitted: ", formData);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <h2 className="text-center">Registration Form</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        {Object.entries({
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          dob: "Date of Birth",
        }).map(([field, label]) => (
          <div key={field} className="mb-3">
            <label className="form-label">{label}</label>
            <input
              type={field.includes("password") ? "password" : field === "dob" ? "date" : "text"}
              className="form-control"
              name={field} 
              value={formData[field] || ""}
              onChange={(e) => dispatch(updateForm({field: e.target.name, value: e.target.value }))}
            />
            {errors[field] && <div className="text-danger">{errors[field]}</div>}
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">Register</button>
        {submitted && <div className="alert alert-success mt-3">Form submitted successfully!</div>}
      </form>
    </div>

    </>
  )
}

export default FormComponent