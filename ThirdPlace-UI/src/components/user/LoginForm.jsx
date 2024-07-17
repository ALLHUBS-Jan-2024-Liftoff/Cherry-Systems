import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm() {
  return (
    <>

    <form method="post">
        <div className="form-group">
            <label th:for="username">Username
                <input className="form-control" field="${loginFormDTO.username}"/>
            </label>
            <p className="error text-danger" errors="${loginFormDTO.username}"></p>
        </div>
        <div className="form-group">
            <label>Password
                <input className="form-control" field="${loginFormDTO.pwHash}" type="password"/>
            </label>
            <p className="error text-danger" errors="${loginFormDTO.pwHash}"></p>
        </div>

        <input type="submit" className="submit-button" value="Log In" />
    </form>

    <p>Don't have an account? <Link to="/Registration">Register</Link></p>
    </>
  )
}
