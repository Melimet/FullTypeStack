export interface BlogType {
  id: string
  title: string
  author: string
  url: string
  likes: number
  user?: UserType | string
}

export interface UserType {
  username: string
  name: string
  id?: string
  token: string
}

export interface NotificationType {
  message: string
  success: boolean
}
