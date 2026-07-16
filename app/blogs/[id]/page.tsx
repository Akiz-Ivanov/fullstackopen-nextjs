import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { addLike, addToReadingListAction } from "@/app/actions/blogs"
import { getCurrentUser } from "@/app/services/session"
import { isInReadingList } from "@/app/services/readingList"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const currentUser = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const isOwner = currentUser?.id === blog.userId
  const alreadyAdded = currentUser && !isOwner
    ? await isInReadingList(currentUser.id, blog.id)
    : false

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-6 border-gray-700 text-gray-200 border-2 rounded-xl">
      <h2 className="text-2xl font-bold">{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p className="flex gap-2">
        URL:
        <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {blog.url}
        </a>
      </p>
      <p>{blog.likes} likes</p>
      <form action={addLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          like
        </button>
      </form>

      {!isOwner && !alreadyAdded && (
          <form action={addToReadingListAction}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
              add to reading list
            </button>
          </form>
        )}
        
    </div>
  )
}

export default BlogPage