import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";  

const store = configureStore({
  reducer: {
    formState: formReducer,  
  },
});

export default store;
