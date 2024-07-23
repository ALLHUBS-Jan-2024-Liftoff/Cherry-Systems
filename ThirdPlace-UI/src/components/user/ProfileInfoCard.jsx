import React from "react";
import { deleteUser } from "../../service/UserServices";

export default function ProfileInfoCard({user, deleteUser}) {
  return (
    <div className="review-card">
      <h2>User Info</h2>

      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Username</th>
            <td>Peggy505</td>
          </tr>
          <tr>
            <th scope="row">Email</th>
            <td>Peggy505@gmail.com</td>
          </tr>
          <tr>
            <th scope="row">Password</th>
            <td>*******</td>
          </tr>
        </tbody>
      </table>
      <tr>
        <td>
          <button 
            className="btn btn-primary" 
            onClick={() => editUser(user.id)}>
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </div>
  );
}
