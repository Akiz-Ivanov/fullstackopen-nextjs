"use client"

import { useActionState } from "react"
import { registerUser, type FormState } from "../actions/users"

const initialState: FormState = { errors: {}, values: { username: "", name: "" } }

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input id="username" type="text" name="username" defaultValue={state.values?.username} />
          </label>
          {state.errors?.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
        </div>
        <div>
          <label>
            Name
            <input id="name" type="text" name="name" defaultValue={state.values?.name} />
          </label>
          {state.errors?.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
        </div>
        <div>
          <label>
            Password
            <input id="password" type="password" name="password" />
          </label>
          {state.errors?.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
        </div>
        <div>
          <label>
            Confirm Password
            <input id="confirmPassword" type="password" name="passwordConfirm" />
          </label>
          {state.errors?.passwordConfirm && <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}