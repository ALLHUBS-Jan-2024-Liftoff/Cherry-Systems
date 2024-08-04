import React, { useEffect } from "react";
import Navbar from "../navigation/Navbar";
import AddUserForm from "../user/AddUserForm";

const Registration = () => {
  return (
    <>
      <Navbar />

      <h1>Register</h1>

      <div className="container review-card">
        <AddUserForm />
      </div>

      <p className="gray-text">
        <center>🍒 Powered by Cherry Systems </center>
      </p>
    </>
  );
}

export default Registration;
