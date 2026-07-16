"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { eq } from "drizzle-orm"

export type FormState = {
  errors?: Record<string, string>
  values?: { username: string; name: string;}
}

export const registerUser = async (
  prevState: FormState,
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: Record<string, string> = {}
  if (!username || username.length < 4) errors.username = "Username must be at least 4 characters long"
  if (!password || password.length < 4) errors.password = "Password must be at least 4 characters long"
  if (password !== passwordConfirm) errors.passwordConfirm = "Passwords do not match"
  
  const alreadyExists = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (alreadyExists) errors.username = "Username already exists"

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}