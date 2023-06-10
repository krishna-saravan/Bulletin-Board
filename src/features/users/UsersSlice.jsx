import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {id: '0', name: 'krishna'},
    {id: '1', name: 'satya'},
    {id: '2', name:'saravan'}

]
    
const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{}
})

export const selectAllUsers = (state) => state.users;
    
export default UsersSlice.reducer;