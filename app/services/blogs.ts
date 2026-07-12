export type Blog = {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

let blogs: Blog[] = [
  {
    id: "1",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/",
    likes: 12,
  },
  {
    id: "3",
    title: "TDD Harms Architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: "4",
    title: "Type Wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
  {
    id: "5",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
]

export const getBlogs = () => blogs

export const getBlogById = (id: string) => {
  return blogs.find((blog) => blog.id === id)
}

export const addBlog = (title: string, author: string, url: string) => {
  const newBlog: Blog = {
    id: (blogs.length + 1).toString(),
    title,
    author,
    url,
    likes: 0,
  }
  blogs = blogs.concat(newBlog)
  return newBlog
}

export const likeBlog = (id: string) => {
  const blog = getBlogById(id)
  if (blog) {
    blog.likes += 1
  }
  return blog
}