import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try{
        const response = await axios.get(USERS_URL)
        return [...response.data]
    }catch(error){
        return error.message
    }
})
    
const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            return action.payload  //we are using this approach because we here we are returning an entire state instead of updating so that users will not be added twice
        })
    }
})

export const selectAllUsers = (state) => state.users;
    
export default UsersSlice.reducer;