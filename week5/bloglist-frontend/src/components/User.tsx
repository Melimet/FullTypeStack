import { UserResponseType } from "../types"

function User({ userInfo }: { userInfo: UserResponseType | undefined }) {
  
  if (!userInfo) return <p>user not found</p>


  return (
    <div>
      <h2>{userInfo.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userInfo.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User