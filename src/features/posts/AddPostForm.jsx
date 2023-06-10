import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {postAdded} from './postsSlice';
import { selectAllUsers} from "../users/UsersSlice";

import React from 'react'

const AddPostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)

    const dispatch = useDispatch()
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content,userId)
            )
            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) &&(userId)

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}> {user.name}</option>
    ))


  return (
    <section>
        <h2>Add new posts</h2>

        <form>
            <label htmlFor="postTitle">Title</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChange}
            ></input>

            <label htmlFor="postAuthor">Author:</label>
            <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                <option value=""></option>
                {userOptions}
            </select>


            <label htmlFor="postContent">content</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChange}
            ></textarea>

            <button type="button" disabled = {!canSave} onClick={onSavePostClicked}>Save post</button>
        </form>
    </section>
  )
}

export default AddPostForm