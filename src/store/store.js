import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from "../features/authSlice.js"
import userSlice from '../features/userSlice.js';
import authSlice2 from '../features/authSlice2.js';

const store = configureStore({
  reducer: {
    auth: authSlice2,
    user:AuthSlice ,
    users:userSlice
  },
});

export default store;