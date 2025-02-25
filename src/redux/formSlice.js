import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: { 
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  },
  errors: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.form[action.payload.field] = action.payload.value;
    },
    setError: (state, action) => {
      state.errors[action.payload.field] = action.payload.message;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    resetForm: (state) => { 
      state.form = initialState.form;
      state.errors = {};
    },
  },
});

export const { updateForm, setError, clearErrors } = formSlice.actions;
export default formSlice.reducer;
