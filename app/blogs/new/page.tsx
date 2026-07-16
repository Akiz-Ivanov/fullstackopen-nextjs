"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog, type FormState } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"
import InputGroup from "@/app/components/InputGroup"

const initialState: FormState = { errors: {}, success: false, values: { title: "", author: "", url: "" } }

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="max-w-2xl mx-auto p-6 border-gray-700 text-orange-300 border-2 rounded-xl text-center">
      <h2 className="text-3xl font-bold my-4">Create a new blog</h2>
      <form action={formAction} className="flex flex-col gap-3 justify-center items-center w-full">
        <InputGroup
          name="title"
          label="title"
          value={state.values?.title}
          error={state.errors?.title}
        />

        <InputGroup
          name="author"
          label="author"
          value={state.values?.author}
          error={state.errors?.author}
        />

        <InputGroup
          name="url"
          label="url"
          value={state.values?.url}
          error={state.errors?.url}
        />
        <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-2 rounded-md text-sm cursor-pointer min-w-28 mt-2 transition-colors" type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog