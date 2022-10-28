export interface BlogType{
  title: string
  author: string
  url: string
  likes: number
  id?: string
}

export interface UserType{
  username: string
  name: string
  id?: string
}

export interface NewUserType{
  username: string
  name: string
  password: string
}