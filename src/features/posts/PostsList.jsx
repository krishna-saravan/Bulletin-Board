import { useSelector, useDispatch } from "react-redux";
import {useEffect } from 'react'

import { selectAllPosts , getPostStatus, getPostError, fetchPosts} from "./postsSlice";
import { selectAllUsers } from "../users/UsersSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts) //we exported all the posts from posts slice
    const postsStatus = useSelector(getPostStatus) //we exported all the posts status from posts slice
    const postsError = useSelector(getPostError) //we exported all the posts error from posts slice
    
    useEffect(()=>{
        if (postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    },[postsStatus,dispatch])
    


    let content;
    if(postsStatus === 'loading'){
        content = <p>"Loading...."</p>;
    }else if(postsStatus === 'succeeded'){
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date)) // here slice() creates a shallow copy of posts 
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    }else if(postsStatus === 'failed'){
        content = <p>{error}</p>
    }

    return(
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList