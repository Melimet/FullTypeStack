export interface BlogType {
  id: string
  title: string
  author: string
  url: string
  likes: number
}

export interface UserType {
  username: string
  name: string
  token: string
}

export interface Notification{
  message: string
  success: boolean
}