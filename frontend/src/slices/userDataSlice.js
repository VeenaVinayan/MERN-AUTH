import { createSlice } from '@reduxjs/toolkit';

const initialState ={
     usersData : [],
}

const userDataSlice = createSlice({
     name:'userData',
     initialState,
     reducers : {
         setUsersData : (state,action) =>{
             state.usersData = action.payload;
         }
     }
});

export const { setUsersData } = userDataSlice.actions;

export default userDataSlice.reducer;