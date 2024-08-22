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
    <div >
      <Navbar />
      
      <div >
        <h1 className='login-title'>Login</h1>

        <div className="container login-sign-up-card">
          <LoginForm />
        </div>

        <p className="gray-text">
          <center>🍒 Powered by Cherry Systems </center>
        </p>
      </div>
      </div>
    </>
  )
}
