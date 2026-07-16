import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike } from "@/app/actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-6 border-gray-700 text-gray-200 border-2 rounded-xl">
      <h2 className="text-2xl font-bold">{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          URL: {blog.url}
        </a>
      </p>
      <p>{blog.likes} likes</p>
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          like
        </button>
      </form>
    </div>
  )
}

export default BlogPage