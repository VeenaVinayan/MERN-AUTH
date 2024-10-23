import { createSlice } from '@reduxjs/toolkit';

const initialState ={
     usersData : null,
}

const userDataSlice = createSlice({
     name:'userData',
     initialState,
     reducers : {
         setUsers : (state,action) =>{
             state.usersData = action.payload;
         }
     }
});

export const { setUsers } = userDataSlice.actions;

export default userDataSlice.reducer;