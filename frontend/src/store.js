import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from './redux/analyticsSlice';

export default configureStore({
  reducer: {
    analytics: analyticsReducer
  }
});
