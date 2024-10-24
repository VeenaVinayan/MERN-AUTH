import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import {apiSlice} from '../slices/apiSlice';
import userReducer from '../slices/userDataSlice';

const store = configureStore({
     reducer: {
         auth:authReducer,
         userData: userReducer,
         [apiSlice.reducerPath]: apiSlice.reducer,
        
     },
     middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
     devTools :true,
});

export default store;
