import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import {sub} from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState =  {
    posts: [],
    status: 'idle',   // 'idle' | 'loading' | 'succeeded'| 'failed'
    error: null 
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try{
        const response = await axios.get(POSTS_URL)

        return [...response.data];
    }catch(error){
        return error.message;
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        postAdded: {
                reducer(state,action){
                state.posts.push(action.payload)
        },
        prepare(title,content,userId){
            return{
                payload: {
                    id:nanoid(),
                title,
                content,
                date: new Date().toISOString(),
                userId,
                reactions: {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                }
                }
            }
        }
    },
    reactionAdded(state,action){
        const {postId, reaction} = action.payload

        const existingPost = state.posts.find(post => post.id === postId)

        if(existingPost){
            existingPost.reactions[reaction]++
        }
    }
    }, // here extra reducers take a bulider as parameter through wich we can create a reducer for every specific action type
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state,action) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state,action) => {
            state.status = 'succeeded';
            // adding date and reactions because our fake api posts call doesn't have a date and reactions

            let min =1;
            const loadedPosts = action.payload.map((post) => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post;
            });

            // Add any fetch post to the array

            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state,action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const {postAdded, reactionAdded} = postsSlice.actions

export default postsSlice.reducer