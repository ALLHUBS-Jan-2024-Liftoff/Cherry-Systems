import React, { useEffect } from 'react';
import Navbar from "../navigation/Navbar";
import LoginForm from '../user/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) {
      navigate('/profile', { user, isAuthenticated });
    }
  }, [])

  return (
    <>
      <Navbar />
      
      <h1 className='login-sign-up'>Login</h1>

      <div className="container login-sign-up-card">
        <LoginForm />
      </div>

      <p className="gray-text">
        <center>🍒 Powered by Cherry Systems </center>
      </p>
    </>
  )
}
