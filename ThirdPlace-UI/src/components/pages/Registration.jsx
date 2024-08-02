import React from "react";
import AddUserForm from "../user/AddUserForm";
import Navbar from "../navigation/Navbar";

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
