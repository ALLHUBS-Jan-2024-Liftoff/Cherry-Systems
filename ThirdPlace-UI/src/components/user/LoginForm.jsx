import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



const LoginForm = () => {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    
    const [error, setError] = useState("");

    useEffect(() => {
        setError('');
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(username, email, password);
            window.location.reload(); // Reload to update context
            setError('');
            alert(`${username} has logged in!`);
            window.location.href = "/";
        } catch (error) {
            setError('Failed to login. Please try again!');
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
                    <br />
                    <label>
                        <small className='login'>Show Password</small>
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

                <button type="submit"  className="submit-button">
                    Log in
                </button>
            </form>

            <p>Don't have an account? <Link to="/Registration">Register</Link></p>
        </>
    )
}

export default LoginForm
