import { configureStore} from '@reduxjs/toolkit';
import UserReducer from './user/userSlice';
 
// to persist data storing it in local storage


export const store = configureStore({
    reducer:{
        user:UserReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
});


