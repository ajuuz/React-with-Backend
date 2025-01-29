import { configureStore} from '@reduxjs/toolkit';
import UserReducer from './user/userSlice';
import AdminReducer from './Admin/adminSlice'
// to persist data storing it in local storage


export const store = configureStore({
    reducer:{
        user:UserReducer,
        admin:AdminReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    }),
});


