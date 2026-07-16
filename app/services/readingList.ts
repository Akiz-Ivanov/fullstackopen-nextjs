import { and, eq } from "drizzle-orm"
import { db } from "../../db"
import { readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
  })
}

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error("Not logged in")
  }

  return db.insert(readingList).values({ userId: user.id, blogId })
}

export const markAsRead = async (id: number) => {
  return db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, id))
}

export const isInReadingList = async (userId: number, blogId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })
  return !!entry
}