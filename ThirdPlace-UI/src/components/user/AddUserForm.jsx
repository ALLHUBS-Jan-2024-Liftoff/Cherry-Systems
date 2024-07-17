import React from 'react'
import { Link } from 'react-router-dom'

export default function AddUserForm() {
  return (
    <>

    <form method="post">
        <div class="form-group">
            <label>Username
                <input className="form-control" field="${registrationFormDTO.username}" />
            </label>
            <p className="error text-danger" errors="${registrationFormDTO.username}"></p>
        </div>
        <div className="form-group">
            <label>Password
                <input className="form-control" field="${registrationFormDTO.pwHash}" type="password" />
            </label>
            <p className="error text-danger" errors="${registrationFormDTO.pwHash}"></p>
        </div>
        <div className="form-group">
            <label>Verify Password
                <input className="form-control" field="${registrationFormDTO.verifyPassword}" type="password" />
            </label>
        </div>

        <input type="submit" className="submit-button" value="Register" />
    </form>

    <p>Already have an account? <Link to="/Login">Login</Link></p>
    </>
  )
}
