import React from 'react'
import { Link } from 'react-router-dom'

export default function AddUserForm() {
  return (
    <>

    <form method="post">
        <div class="form-group">
            <label className="form-label">
                Username
                <input
                type="text"
                className="form-control"
                field="${registrationFormDTO.username}"
                required
                />
            </label >
            <p className="error text-danger" errors="${registrationFormDTO.username}"></p>
        </div>
        <div className="form-group">
            <label className="form-label">
                Email
                <input
                type="email"
                className="form-control"
                field="${registrationFormDTO.email}"
                required
                />
            </label>
            <p className="error text-danger" errors="${registrationFormDTO.email}"></p>
        </div>
        <div className="form-group">
            <label className="form-label">
                Verify Email
                <input
                type="email"
                className="form-control"
                field="${registrationFormDTO.verifyemail}"
                required
                />
            </label>
        </div>
        <div className="form-group">
            <label className="form-label">
                Password
                <input 
                type="password"
                field="${registrationFormDTO.password}"
                className="form-control"
                required
                />
            </label>
            <p className="error text-danger" errors="${registrationFormDTO.password}"></p>
        </div>
        <div className="form-group">
            <label className="form-label">
                Verify Password
                <input
                type="password"
                className="form-control"
                field="${registrationFormDTO.verifyPassword}"
                required
                />
            </label>
        </div>

        <input type="submit" className="submit-button" value="Register" />
    </form>

    <p>Already have an account? <Link to="/Login">Login</Link></p>
    </>
  )
}
