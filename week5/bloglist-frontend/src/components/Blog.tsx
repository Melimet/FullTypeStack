import { BlogType } from "../types"
import "../index.css"
interface BlogProps {
  blog: BlogType
}

function Blog({ blog }: BlogProps) {
  return (
    <div className="blog">
      <h3>{blog.title}</h3>
      <p>{blog.author}</p>
    </div>
  )
}

export default Blog
