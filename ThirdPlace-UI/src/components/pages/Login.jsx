import React from 'react';
import LoginForm from '../user/LoginForm';
import Navbar from "../navigation/Navbar";
import { AuthProvider } from '../../context/AuthContext';

export default function Login() {
  return (
    <>
      <Navbar />

      <h1>Login</h1>

      <div className="container review-card">
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </div>
      
      <p className="gray-text">
        <center>🍒 Powered by Cherry Systems </center>
      </p>
    </>
  )
}
