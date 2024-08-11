import React from "react";
import { deleteUser } from "../../service/UserServices";
import { useAuth } from "../../context/AuthContext";

export default function ProfileInfoCard() {
  const { user } = useAuth();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!confirm(`Are you sure you want to delete user: ${user.username}?`)) {
      // Cancel is clicked
      e.preventDefault();
      alert('Cancelled: User was NOT deleted!');
    } else {
      // Ok is clicked
      try {
        await deleteUser(user.id);
        alert(`${user.username} has been deleted!`);
        window.location.href = "/";
      } catch (error) {
        console.error('Failed to delete user!', error);
        throw error;
      }
    }
};

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
            value={user.id}
            onClick={handleDelete}
            >
            Delete
          </button>
      </span>
    </div>
  );
}
