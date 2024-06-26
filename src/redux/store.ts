
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import commonReducer from './reducers/commonReducer';
import articleReducer from './reducers/articleReducer';
// import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    commonReducer,
    articleReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;