import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";

const store = configureStore({
    reducer:{
        //here we will pass all our slice
        auth: authSlice,
        job: jobSlice
    }
});

export default store;