import { eq, ilike, desc } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
      orderBy: desc(blogs.likes),
    })
  }
  
  return db.query.blogs.findMany({
    orderBy: desc(blogs.likes),
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url })
}

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}