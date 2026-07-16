import { generateToken } from "../actions/users"
import { markAsReadAction } from "../actions/readingList"
import TokenDisplay from "../components/TokenDisplay"
import { getCurrentUser } from "../services/session"
import { getReadingList } from "../services/readingList"
import Link from "next/link"

const Me = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div>
        <h2>Not logged in</h2>
      </div>
    )
  }

  const readingListEntries = await getReadingList(user.id)
  const unread = readingListEntries.filter((entry) => !entry.read)
  const read = readingListEntries.filter((entry) => entry.read)

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-6 border-gray-700 text-gray-200 border-2 rounded-xl">
      <div className="flex flex-col gap-3 border-b pb-10">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
      </div>

      <div className="flex flex-col gap-4 border-b pb-10">
        <h3 className="text-2xl font-bold">Reading List</h3>

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Unread ({unread.length})</h4>
          {unread.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between bg-yellow-950/30 px-4 py-2 rounded-md"
            >
              <Link href={`/blogs/${entry.blog.id}`} className="text-blue-400 hover:underline">
                {entry.blog.title}
              </Link>
              <form action={markAsReadAction}>
                <input type="hidden" name="id" value={entry.id} />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md cursor-pointer"
                >
                  mark as read
                </button>
              </form>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">Read ({read.length})</h4>
          {read.map((entry) => (
            <div key={entry.id} className="bg-green-950/30 px-4 py-2 rounded-md">
              <Link href={`/blogs/${entry.blog.id}`} className="text-blue-400 hover:underline">
                {entry.blog.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold">
          API Token
        </h3>
        {user.token ? (
          <div className="flex flex-col gap-2 border border-white/30 rounded-lg p-4">
            <p>Current token:</p>
            <TokenDisplay token={user.token} />
          </div>
        ) : (
          <p>No token generated yet</p>
        )}
        <form action={generateToken}>
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-2 rounded-md text-sm cursor-pointer mt-2 transition-colors"
          >
            Generate new token
          </button>
        </form>
      </div>
    </div>
  )
}

export default Me