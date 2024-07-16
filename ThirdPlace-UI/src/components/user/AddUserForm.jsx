import React from 'react'

export default function AddUserForm() {
  return (
    <>

    <form method="post">
        <div class="form-group">
            <label>Username
                <input class="form-control" field="${registerFormDTO.username}" />
            </label>
            <p class="error text-danger" errors="${registerFormDTO.username}"></p>
        </div>
        <div class="form-group">
            <label>Password
                <input class="form-control" field="${registerFormDTO.pwHash}" type="password" />
            </label>
            <p class="error text-danger" errors="${registerFormDTO.pwHash}"></p>
        </div>
        <div class="form-group">
            <label>Verify Password
                <input class="form-control" field="${registerFormDTO.verifyPassword}" type="password" />
            </label>
        </div>

        <input type="submit" class="btn btn-primary" value="Register" />
    </form>

    <p>Already have an account? <a href="/Login">Login</a></p>
    </>
  )
}
