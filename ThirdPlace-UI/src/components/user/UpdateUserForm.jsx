import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../service/UserServices';
import ProfileInfoCard from './ProfileInfoCard';
import plant0 from '../../assets/plant0.png';
import plant1 from '../../assets/plant1.png';
import plant2 from '../../assets/plant2.png';
import plant3 from '../../assets/plant3.png';
import plant4 from '../../assets/plant4.png';
import plant5 from '../../assets/plant5.png';

const UpdateUserForm = () => {
    const { user } = useAuth();
    const [editMode, setEditMode] = useState(true);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [verifyEmail, setVerifyEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [profileImage, setProfileImage] = useState(0);

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(username, email, verifyEmail, password, verifyPassword, profileImage);
            window.location.reload(); // Reload to update context
            setError('');
            alert(`${user.username} was successfully updated!`)
            // setEditMode(false);
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
                            type={
                                showPassword ? "text" : "password"
                            }
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
                            type={
                                showPassword ? "text" : "password"
                            }
                            className="form-control"
                            name='verifyPassword'
                            value={verifyPassword}
                            placeholder='reenter or make new'
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <label>
                        <small>Show Passwords</small>
                        <input
                            name="check"
                            type="checkbox"
                            value={showPassword}
                            onChange={() =>
                                setShowPassword((prev) => !prev)
                            }
                            />
                    </label>
                    <div className="form-group">
                        <label className="form-label">
                            Profile Image
                            <br/>
                        <input 
                            type="radio" 
                            id="defaultImage"
                            value={0}
                            defaultChecked={user.profileImage === 0}
                            name='profileImage'
                            onChange={(e) => setProfileImage(e.target.value)}
                            />
                            <label htmlFor={0}><img src={plant0} className="form-label"/></label>{"\t"} 
                        <input 
                            type="radio" 
                            id="profileImage1"
                            value={1}
                            defaultChecked={user.profileImage === 1}
                            name='profileImage'
                            onChange={(e) => setProfileImage(e.target.value)}
                            />
                            <label htmlFor={1}><img src={plant1} className="form-label"/></label>{"\t"} 
                        <input 
                            type="radio" 
                            id="profileImage2"
                            value={2}
                            defaultChecked={user.profileImage === 2}
                            name='profileImage'
                            onChange={(e) => setProfileImage(e.target.value)}
                            />
                            <label htmlFor={2}><img src={plant2} className="form-label"/></label>{"\t"} 
                        <br/>
                        <input 
                            type="radio" 
                            id="profileImage3"
                            value={3}
                            defaultChecked={user.profileImage === 3}
                            name='profileImage'
                            onChange={(e) => setProfileImage(e.target.value)}
                            />
                            <label htmlFor={3}><img src={plant3} className="form-label"/></label>{"\t"} 
                        <input 
                            type="radio" 
                            id="profileImage4"
                            value={4}
                            defaultChecked={user.profileImage === 4}
                            name='profileImage'
                            onChange={(e) => setProfileImage(e.target.value)}
                            />
                            <label htmlFor={4}><img src={plant4} className="form-label"/></label>{"\t"} 
                        <input 
                            type="radio" 
                            id="profileImage5"
                            value={5}
                            defaultChecked={user.profileImage === 5}
                            name='profileImage'
                            onChange={(e) => setProfileImage(e.target.value)}
                            />
                        <label htmlFor={5}><img src={plant5} className="form-label"/></label>{"\t"} 
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