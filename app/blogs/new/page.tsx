"use client"

import { useActionState } from "react"
import { createBlog, type FormState } from "../../actions/blogs"

const initialState: FormState = { errors: {}, values: { title: "", author: "", url: "" } }

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            title: 
            <input id="title" type="text" name="title" defaultValue={state.values?.title} />
          </label>
          {state.errors?.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        </div>
        <div>
          <label>
            author: 
            <input id="author" type="text" name="author" defaultValue={state.values?.author} />
          </label>
          {state.errors?.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        </div>
        <div>
          <label>
            url: 
            <input id="url" type="text" name="url" defaultValue={state.values?.url} />
          </label>
          {state.errors?.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog