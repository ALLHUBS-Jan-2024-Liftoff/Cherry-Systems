import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm() {
  return (
    <>

    <form method="post">
        <div className="form-group">
            <label className="form-label">
                Username
                <input 
                className="form-control"
                field="${loginFormDTO.username}"
                required
                />
            </label>
            <p className="error text-danger" errors="${loginFormDTO.username}"></p>
        </div>
        <div className="form-group">
            <label className="form-label">
                Email
                <input 
                type="email"
                className="form-control"
                field="${loginFormDTO.email}"
                required
                />
            </label>
            <p className="error text-danger" errors="${loginFormDTO.email}"></p>
        </div>
        <div className="form-group">
            <label className="form-label">
                Password
                <input 
                type="password"
                className="form-control"
                field="${loginFormDTO.password}"
                required
                />
            </label>
            <p className="error text-danger" errors="${loginFormDTO.password}"></p>
        </div>

        <input type="submit" className="submit-button" value="Log In" />
    </form>

    <p>Don't have an account? <Link to="/Registration">Register</Link></p>
    </>
  )
}
