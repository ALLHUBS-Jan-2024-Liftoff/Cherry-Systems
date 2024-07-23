import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../../service/UserServices';
import { fetchUsers } from '../../service/UserServices';
import { HttpStatusCode } from 'axios';
import axios from 'axios';

const AddUserForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [verifyEmail, setVerifyEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username !== "" && email !== "" && verifyEmail !== "" && password !== "" && verifyPassword !== "") {
            addUser(username, email, password);
            // setUsername("");
            // setEmail("");
            // setVerifyEmail("");
            // setPassword("");
            // setVerifyPassword("");
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
                    <p className="error text-danger" errors="error"></p>
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
                    <p className="error text-danger" errors=""></p>
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
                    <p className="error text-danger" errors=""></p>
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