import React from "react";
// import { deleteUser } from "../../service/UserServices";
import { useAuth } from "../../context/AuthContext";

export default function ProfileInfoCard() {
  const { user } = useAuth();

  return (
    <div className="review-card">
      <h2>User Info</h2>

      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Username</th>
            <td>{user.username}</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th scope="row">Password</th>
            <td>*******</td>
          </tr>
        </tbody>
      </table>
      <span>
          <button 
            className="btn btn-primary" 
            onClick={() => editUser(user.id)}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteUser(user.id)}
            >
            Delete
          </button>
      </span>
    </div>
  );
}
