import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentAdmin : localStorage.getItem('adminInfo')
    ? JSON.parse(localStorage.getItem('adminInfo'))
    :null
}
const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        AdminSignInSuccess:(state,action)=>{
            state.currentAdmin = action.payload;
            localStorage.setItem('adminInfo',JSON.stringify(state.currentAdmin))
        },
        AdminLogout:(state)=>{
            state.currentAdmin=null;
            localStorage.removeItem('adminInfo');
        }
    }
})

export const {AdminSignInSuccess,AdminLogout} = adminSlice.actions;
export default adminSlice.reducer;