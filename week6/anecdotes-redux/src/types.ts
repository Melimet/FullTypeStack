interface AnecdoteType {
  content: string
  id: string
  votes: number
}

interface StateType {
  anecdotes: AnecdoteType[]
  notifications: string
  filter: string
}

export type { AnecdoteType, StateType }
