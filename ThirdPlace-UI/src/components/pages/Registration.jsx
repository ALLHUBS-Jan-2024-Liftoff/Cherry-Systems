import React, { useEffect } from "react";
import Navbar from "../navigation/Navbar";
import AddUserForm from "../user/AddUserForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Registration = () => {
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

      <div>
        <h1 className="register-title">Register</h1>

        <div className="container login-sign-up-card">
          <AddUserForm />
        </div>
        
        <p className="gray-text">
          <center>🍒 Powered by Cherry Systems </center>
        </p>
      </div>
    </>
  );
}

export default Registration;
