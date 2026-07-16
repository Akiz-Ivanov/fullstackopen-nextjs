"use server"

import { revalidatePath } from "next/cache"
import { markAsRead } from "../services/readingList"

export const markAsReadAction = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await markAsRead(id)
  revalidatePath("/me")
}