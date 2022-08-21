/// <reference types="react-scripts" />
import React from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Divider, Container } from '@mui/material';
import {
    Close, HomeOutlined, SearchOutlined, LogoutOutlined, NotificationsOutlined,
    SettingsOutlined, LoginOutlined, PersonAddOutlined, PostAddOutlined, LocalPostOfficeOutlined
} from '@mui/icons-material';

import { SignOut } from '../store/modules/auth/actions';
import { useAppSelector, useAppDispatch } from '../types/hooks';
import Avatar from '../Assets/default.png';
import './Navigation.css';

const Navigation = () => {
    const currentState = useAppSelector((state) => state.Auth);
    const { isAuthenticated, currentUser } = currentState;
    const dispatch = useAppDispatch();

    const userProfile = isAuthenticated ? `/profile/${currentState.currentUser.id}` : "#"
    let imagePreview = null;
    if (currentUser && currentUser.avatar_path) {
        imagePreview = (<img className="img_style_nav" src={currentUser.avatar_path} alt="profile 1" />);
    } else {
        imagePreview = (<img className="img_style_nav" src={Avatar} alt="profile 2" />);
    }

    const logout = () => {
        dispatch(SignOut());
    };

    const SignedInLinks = (
        <React.Fragment>
            <li className="nav-link">
                <Link to="/">
                    <i className='icon' >
                        <HomeOutlined />
                    </i>
                    <span className="text nav-text">Dashboard</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to="/createpost">
                    <i className='icon'>
                        <PostAddOutlined />
                    </i>
                    <span className="text nav-text">Create Post</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to="/authposts">
                    <i className='icon'>
                        <LocalPostOfficeOutlined />
                    </i>
                    <span className="text nav-text">My Posts</span>
                </Link>
            </li>
            <Container>
                <Divider sx={{ marginTop: "10px" }} />
            </Container>
            <li className="nav-link">
                <Link to="#">
                    <i className='icon'>
                        <NotificationsOutlined />
                    </i>
                    <span className="text nav-text">Notifications</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to={userProfile}>
                    <i className='icon'>
                        <SettingsOutlined />
                    </i>
                    <span className="text nav-text">Settings</span>
                </Link>
            </li>
            <li className="nav-link">
                <a onClick={logout}>
                    <i className='icon' >
                        <LogoutOutlined />
                    </i>
                    <span className="text nav-text">Logout</span>
                </a>
            </li>
        </React.Fragment>

    );
    const SignedOutLinks = (
        <React.Fragment>
            <li className="nav-link">
                <Link to="/login">
                    <i className='icon' >
                        <LoginOutlined />
                    </i>
                    <span className="text nav-text">Login</span>
                </Link>
            </li>
            <li className="nav-link">
                <Link to="/signup">
                    <i className='icon' >
                        <PersonAddOutlined />
                    </i>
                    <span className="text nav-text">Signup</span>
                </Link>
            </li>
        </React.Fragment>
    );

    return (
        <div>
            <nav className="sidebar close" id="sidebar">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={Avatar} alt="" />
                        </span>

                        <div className="text logo-text">
                            <span className="name">Codinglab</span>
                            <span className="profession">Web developer</span>
                        </div>
                    </div>

                    <span onClick={() => document.getElementById("sidebar").classList.toggle("close")} className='toggle'>
                        <Close />
                    </span>
                </header>

                <div className="menu-bar">
                    <div className="menu">

                        <li className="search-box">
                            <span onClick={() => document.getElementById("sidebar").classList.remove("close")}>
                                <i className='icon'>
                                    <SearchOutlined />
                                </i>
                            </span>
                            <input type="text" placeholder="Search..." />
                        </li>

                        <ul className="menu-links">
                            {SignedInLinks}

                        </ul>
                    </div>

                    <div className="bottom-content">
                        <div className="image-text">
                            <span className="image">
                                <img src={Avatar} alt="" />
                            </span>

                            <div className="text logo-text">
                                <span className="name">Codinglab</span>
                                <span className="profession">Web developer</span>
                            </div>
                        </div>

                    </div>
                </div>

            </nav>

        </div>
    );
}

export default Navigation;