import { createSlice, current } from "@reduxjs/toolkit";

const initialState={
    currentUser:localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    :null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            localStorage.setItem('userInfo',JSON.stringify(state.currentUser))
        },
        userLogout:(state)=>{
            state.currentUser=null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const {signInSuccess,userLogout}=userSlice.actions;
export default userSlice.reducer;