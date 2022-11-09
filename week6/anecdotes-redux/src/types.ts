interface AnecdoteType {
  content: string
  id: string
  votes: number
}

interface StateType {
  anecdotes: AnecdoteType[]
}

export type { AnecdoteType, StateType }
