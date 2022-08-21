import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';

/* import CreatePost from './components/posts/CreatePost';
import Profile from './components/users/Profile';
import ForgotPassword from './components/users/ForgotPassword';
import ResetPassword from './components/users/ResetPassword';
import PostDetails from './components/posts/PostDetails'
import AuthPosts from './components/posts/AuthPosts' */


const RoutesPaths = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* 
              //@ts-ignore */}
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          {/* <Route path='/createpost' element={<CreatePost />} /> */}
          {/* <Route path='/profile/:id' element={<Profile />} /> */}
          {/* <Route path='/forgotpassword' element={<ForgotPassword />} /> */}
          {/* <Route path='/resetpassword/:token' element={<ResetPassword />} /> */}
          {/* <Route path='/posts/:id' element={<PostDetails />} /> */}
          {/* <Route path='/authposts' element={<AuthPosts />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesPaths;

