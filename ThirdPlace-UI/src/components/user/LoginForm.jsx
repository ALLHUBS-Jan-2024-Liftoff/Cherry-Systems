import React from 'react'

export default function LoginForm() {
  return (
    <>

    <form method="post">
        <div class="form-group">
            <label th:for="username">Username
                <input class="form-control" field="${loginFormDTO.username}"/>
            </label>
            <p class="error text-danger" errors="${loginFormDTO.username}"></p>
        </div>
        <div class="form-group">
            <label>Password
                <input class="form-control" field="${loginFormDTO.pwHash}" type="password"/>
            </label>
            <p class="error text-danger" errors="${loginFormDTO.pwHash}"></p>
        </div>

        <input type="submit" class="btn btn-primary" value="Log In" />
    </form>

    <p>Don't have an account? <a href="/Registration">Register</a></p>
    </>
  )
}
