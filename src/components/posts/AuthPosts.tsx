import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaFilter } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from "../../types/hooks";


import { fetchAuthPosts } from '../../store/modules/posts/actions';
import AuthPost from './AuthPost'
import Navigation from '../Navigation'
import './Posts.css';


const AuthPosts = () => {

  const currentState = useAppSelector((state) => state.Auth);
  const authID = currentState.currentUser.id

  const postsSelector = useAppSelector((state) => state.postsReducer);
  const dispatch = useAppDispatch();

  const getAuthPosts = id => dispatch(fetchAuthPosts(id));

  useEffect(() => {
    getAuthPosts(authID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //incase someone visits the route manually
  if (!currentState.isAuthenticated) {
    return <Navigate replace to='/login' />
  }

  let authPosts = postsSelector.authPosts.map(post => {
    return (
      <div className="mt-2 style-card" key={post.id}>
        <Link to={'/posts/' + post.id} key={post.id}>
          <AuthPost post={post} key={post.id} />
        </Link>
      </div>
    );
  })


  return (
    <div className="App">
      <div>
        <Navigation />
      </div>
      <div className="container">
        {authPosts.length > 0 ? (
          <div className="container">{authPosts}</div>
        ) : (
          <div className="text-center mt-4">
            <div style={{ fontSize: "100px" }}><FaFilter /></div>
            <p className="mt-2">It seems you have not created any posts yet.</p>
            <p>Click the button the button below to create one</p>
            <div className="mt-4">
              <Link to="/createpost" className="btn btn-primary">Create Post</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPosts
