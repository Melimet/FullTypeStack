import { BlogType } from "../types"
import "../index.css"
import { useState } from "react"
interface BlogProps {
  blog: BlogType
}

function Blog({ blog }: BlogProps) {

  const [visible, setVisible] = useState(false)

  function toggleVisibility() {
    setVisible(!visible)
  }

  return (
    <div className="blog">
      <h3>{blog.title}</h3>
      {!visible &&
        <button onClick={toggleVisibility}>show</button>}
      {visible &&<>
        <p>By: {blog.author}</p>
        <p>{blog.url}</p>
        <button onClick={toggleVisibility}>hide</button>
        </>
      }
    </div>
  )
}

export default Blog
