import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    reducer:{
        //here we will pass all our slice
        auth: authSlice
    }
});

export default store;