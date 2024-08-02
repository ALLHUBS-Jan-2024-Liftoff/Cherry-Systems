import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { login } = useAuth();

    useEffect(() => {
        setError('');
    }, [username, email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(username, email, password);

            setUsername('');
            setEmail('');
            setPassword('');
            setSuccess(true);
        } catch (error) {
            setError('Login failed');
        }

    };

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to={'/profile'}>Go to My Profile</Link>
                    </p>
                </section>
            ) : (
            <section>
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
            </section>
            )}
        </>
    )
}

export default LoginForm
