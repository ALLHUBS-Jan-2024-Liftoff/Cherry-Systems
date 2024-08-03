import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserProfile from '../pages/UserProfile';



const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { login, user, setUser } = useAuth();

    useEffect(() => {
        setError('');
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(username, email, password);

            navigate("/profile");
            // setSuccess(true);
        } catch (error) {
            setError('Login failed. Please try again!');
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
                        type='text'
                        className="form-control"
                        name='username'
                        autoComplete='off'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Email
                        <input 
                        type="email"
                        className="form-control"
                        name='email'
                        autoComplete='off'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </label>
                </div>

                <button type="submit"  className="submit-button">
                    Log in
                </button>
            </form>

            <p>Don't have an account? <Link to="/Registration">Register</Link></p>
        </>
    )
}

export default LoginForm
