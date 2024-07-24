import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../service/UserServices';
import { fetchUsers } from '../../service/UserServices';

const AddUserForm = () => {
    const navigate = useNavigate();

    const [userList, setUserList] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verifyEmail, setVerifyEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    //Fetch and set all users when components first starts
    //Will refactor for better security later
    useEffect(() => {
        fetchUsers()
        .then(setUserList)
        .catch((error) => {
            console.error("There was an error fetching to Users", error);
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
        
        //If passwords don't match
        if (verifyPassword !== password) {
            alert('Passwords do not match');
            e.preventDefault();
            return false;
        }

        if (username !== "" && email !== "" && verifyEmail !== "" && password !== "" && verifyPassword !== "") {
            addUser(username, email, password);
        }
        
        navigate("/profile");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">
                        Username
                        <input
                        type="text"
                        className="form-control"
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
                        type="password"
                        className="form-control"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        required
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