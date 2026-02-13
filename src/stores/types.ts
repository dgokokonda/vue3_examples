export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
}

export type PostForm = Pick<Post, 'title' | 'body'>

export interface User {
  id: number
  name?: string
  firstName: string
  lastName: string
  avatar?: string
  username?: string
  email: string
  address?: Address
  phone?: string
  website?: string
  company?: Company
  role: 'admin' | 'user' | 'moderator'
  plan?: string
  subscription: Subscription | null
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Record<string, string>
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface Subscription {
  plan: 'Basic' | 'Premium' | 'Enterprise' | ''
  status: 'active' | 'expired' | 'pending'
  expiresAt: string | null
}

export interface UserEdit {
  id?: number
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  subscription: Subscription
}
