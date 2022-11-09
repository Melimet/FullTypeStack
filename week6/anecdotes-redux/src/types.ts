interface AnecdoteType {
  content: string
  id: string
  votes: number
}

interface StateType {
  anecdotes: AnecdoteType[]
  notifications: string
}

export type { AnecdoteType, StateType }
