import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../service/UserServices';
import { fetchUsers } from '../../service/UserServices';
import { useAuth } from '../../context/AuthContext';

const AddUserForm = () => {
    const { user, isAuthenticated } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verifyEmail, setVerifyEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [userList, setUserList] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //Fetch and set all users when components first starts
    //Will refactor for better security later
    useEffect(() => {
        fetchUsers()
        .then(setUserList)
        .catch((error) => {
            console.error("There was an error fetching the Users", error);
        });
    }, []);

    //Search all user's for matching username
    //Will refactor for better security later
    const usernameExists = (username) => {
        userList.forEach(row => {
            if (row.username === username) {
                alert('Username already exists');
                return true;
            }
        });
    };

    //Search all user's for matching email
    //Will refactor for better security later
    const emailExists = (email) => {
        userList.forEach(row => {
            if (row.email === email) {
                alert('Email already exists');
                return true;
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validValues = (username, email, verifyEmail, password, verifyPassword) => {            
            //If username already exists
            //Will refactor for better security later
            if (usernameExists(username)) {
                e.preventDefault();
                return false;
            }
    
            //If email already exists
            //Will refactor for better security later
            if (emailExists(email)) {
                e.preventDefault();
                return false;
            }
    
            //If emails don't match
            if (verifyEmail !== email) {
                alert('Emails do not match');
                e.preventDefault();
                return false;
            }

            //Password must be between 5 and 30 characters
            if (password) {
                if (password.length < 5 || password.length > 30) {
                    alert('Passwords must be between 5 and 30 characters!');
                    e.preventDefault();
                    return false;
                }
            }
            
            //If passwords don't match
            if (verifyPassword !== password) {
                alert('Passwords do not match');
                e.preventDefault();
                return false;
            }

            else {
                return true;
            }
        }

        if (username !== "" && email !== "" && verifyEmail !== "" && password !== "" && verifyPassword !== "" && validValues(username, email, verifyEmail, password, verifyPassword)) {
            setError("");
            registerUser(username, email, verifyEmail, password, verifyPassword);
            alert("User was successfully created! Please log in.")
            navigate('/login', { user, isAuthenticated });
        } else {
            setError("User was not registered. Please try again.");
        }
        
    };

    return (
        <>
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
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        required
                        />
                    </label>
                    <br />
                    <label>
                        <medium>Show Passwords</medium>
                        <input
                            name="check"
                            type="checkbox"
                            value={showPassword}
                            onChange={() =>
                                setShowPassword((prev) => !prev)
                            }
                            />
                    </label>
                </div>

                <button type="submit" className="submit-button">
                    Register
                </button>
            </form>

            <p>Already have an account? <Link to="/Login">Login</Link></p>
        </>
    )
}

export default AddUserForm;