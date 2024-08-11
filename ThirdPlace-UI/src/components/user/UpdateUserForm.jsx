import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../service/UserServices';
import ProfileInfoCard from './ProfileInfoCard';

const UpdateUserForm = () => {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(true);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [verifyEmail, setVerifyEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(username, email, verifyEmail, password, verifyPassword);
            window.location.reload(); // Reload to update context
            setError('');
            alert(`${user.username} was successfully updated!`)
            setEditMode(false);
        } catch (error) {
            setError("User was not updated. Please try again.");
        }
        
    };

    return (
        <>
            {editMode ? (
            <section className='review-card'>
                <h2>Edit User Info</h2>
                
                {error ? <div className="alert alert-danger">{error}</div> : ""}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            Username
                            <input
                            type="text"
                            className="form-control"
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                        </label >
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Email
                            <input
                            type="email"
                            className="form-control"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Verify Email
                            <input
                            type="email"
                            className="form-control"
                            name='verifyEmail'
                            value={verifyEmail}
                            onChange={(e) => setVerifyEmail(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Password
                            <input
                            type="password"
                            className="form-control"
                            name='password'
                            value={password}
                            placeholder='reenter or make new'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Verify Password
                            <input
                            type="password"
                            className="form-control"
                            name='verifyPassword'
                            value={verifyPassword}
                            placeholder='reenter or make new'
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                            />
                        </label>
                    </div>

                    <button type="submit" className="submit-button">
                        Save
                    </button>
                </form>
                    <button type="submit" className="delete-button" onClick={() => {setEditMode(false)}}>
                        Cancel
                    </button>
            </section>) : (
                <ProfileInfoCard/>
            )}
        </>
    )
}

export default UpdateUserForm;