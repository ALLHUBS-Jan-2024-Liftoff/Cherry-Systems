import React from 'react';
import LoginForm from '../user/LoginForm';
import Navbar from "../navigation/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />

      <h2>Login</h2>

      <div className="container review-card">
        <LoginForm />
      </div>
      
      <p className="gray-text">
        <center>🍒 Powered by Cherry Systems </center>
      </p>
    </>
  )
}
