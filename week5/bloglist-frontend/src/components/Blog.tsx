import { BlogType } from "../types";

interface BlogProps {
  blog: BlogType
}

function Blog({ blog }: BlogProps ) {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.author}</p>
    </div>
  )
}

export default Blog;