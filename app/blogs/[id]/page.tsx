import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike } from "@/app/actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(id)

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>{blog.likes}</p>
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          like
        </button>
      </form>
    </div>
  )
}

export default BlogPage