import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const allBlogs = getBlogs()

  const blogs = filter
    ? allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : allBlogs

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <form>
        <input type="text" name="filter" defaultValue={filter} placeholder="search by title" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author} {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs