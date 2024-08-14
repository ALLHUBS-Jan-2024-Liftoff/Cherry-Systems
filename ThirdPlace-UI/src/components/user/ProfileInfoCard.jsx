import React, { useState } from "react";
import { deleteUser } from "../../service/UserServices";
import { useAuth } from "../../context/AuthContext";
import UpdateUserForm from "./UpdateUserForm";
import ProfileImage from "./ProfileImage";
import { CherryScoreBadge } from "./CherryScoreBadge";

export default function ProfileInfoCard() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!confirm(`Would you like to edit user: ${user.username}?`)) {
      // Cancel is clicked
      e.preventDefault();
      alert('Cancelled: User will NOT be edited!');
    } else {
      // Ok is clicked
      setEditMode(true);
    }
  };

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
    <>
      {!editMode ? (
      <section className="review-card">
        <h2>User Info</h2>

        <ProfileImage/>
        <br/>
        <br/>

        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Username:</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th scope="row">Email:</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th scope="row">Password:</th>
              <td>*******</td>
            </tr>
          </tbody>
        </table>
        <span>
            <button 
              className="submit-button" 
              onClick={handleUpdate}>
              Edit
            </button>
            <button
              className="delete-button"
              value={user.id}
              onClick={handleDelete}
              >
              Delete
            </button>
        </span>
      </section>
      ) : (
        <UpdateUserForm/>
      )}
    </>
  );
}
