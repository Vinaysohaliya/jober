import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
  };
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login: (state,action)=>{
            console.log("id"+action.payload.$id);
            state.status=true;
            state.userData=action.payload;
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
});


export const {login,logout}=authSlice.actions;

export default authSlice.reducer;