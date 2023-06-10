import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postsSlice'
import userReducer from '../features/users/UsersSlice'

export const store = configureStore({
    reducer:{
        posts: postReducer,
        users: userReducer
    }
})