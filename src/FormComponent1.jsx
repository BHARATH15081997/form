import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, setError, clearErrors } from "./redux/formSlice";

const FormComponent1 = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formState?.form || {}); 
  const errors = useSelector((state) => state.formState?.errors || {});

  const handleChange = (e) => {
    dispatch(updateForm({ field: e.target.name, value: e.target.value }));
  };

  return (
    <div>
      <input
        type="text"
        name="firstName"
        value={formData.firstName || ""}  
        onChange={handleChange}
      />
      {errors.firstName && <p>{errors.firstName}</p>}
    </div>
  );
};

export default FormComponent1;
