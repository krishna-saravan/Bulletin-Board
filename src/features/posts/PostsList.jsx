import { useSelector } from "react-redux";
import React from 'react'

import { selectAllPosts } from "./postsSlice";
import { selectAllUsers } from "../users/UsersSlice";
import ReactionButtons from "./ReactionButtons";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
    const posts = useSelector(selectAllPosts) //we exported all the posts from posts slice
    const orderdPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date)) // here slice() creates a shallow copy of posts 

    const renderdPosts = orderdPosts.map( post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0,100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timeStamp={post.date}/>
            </p>

            <ReactionButtons post={post}/>
        </article>
    ))

    return(
        <section>
            <h2>Posts</h2>
            {renderdPosts}
        </section>
    )
}

export default PostsList