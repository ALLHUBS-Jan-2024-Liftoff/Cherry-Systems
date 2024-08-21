import React, { useEffect, useState } from "react";
import { deleteUser } from "../../service/UserServices";
import { useAuth } from "../../context/AuthContext";
import UpdateUserForm from "./UpdateUserForm";
import ProfileImage from "./ProfileImage";
import { CherryScoreBadge } from "./CherryScoreBadge";

export default function ProfileInfoCard({otherUser}) {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const propOtherUser = otherUser;

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
      <section className="review-card-edit">
        <div className="contains-all-but-buttons">
          <section className="img-cherry-score">
            <div>
              <ProfileImage otherUser={otherUser}/>
              <p className="gray-text-edit-profile-card">
                <span>🍒 Powered by Cherry Systems</span>
              </p>
            </div>
            <div className="score-and-table">
              {propOtherUser ? (
                <div className={propOtherUser.cherryPoints > 0 ? 'cherry-score-component-div-green' : 'cherry-score-component-div-red'}>
                  <CherryScoreBadge otherUser={otherUser}/>
                </div>
              ) : (
                <div className={user.cherryPoints > 0 ? 'cherry-score-component-div-green' : 'cherry-score-component-div-red'}>
                  <CherryScoreBadge/>
                </div>
              )}
              <div className="profile-card-table"> 
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th scope="row">Username:</th>
                      {propOtherUser ? (
                        <td>{propOtherUser.username}</td>
                      ) : (
                        <td>{user.username}</td>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">Email:</th>
                      {propOtherUser ? (
                        <td>{propOtherUser.email}</td>
                      ) : (
                        <td>{user.email}</td>
                      )}
                    </tr>
                    <tr>
                      <th scope="row">Password:</th>
                      <td>*******</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        {(propOtherUser && propOtherUser.username !== user.username) ? "" : (
          <span className="profileInfoCard-buttons">
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
        )}
      </section>
      ) : (
        <UpdateUserForm/>
      )}
    </>
  );
}
