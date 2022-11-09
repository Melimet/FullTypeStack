const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote: string) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

function addLike(id: string) {
  return {
    type: "ADD_LIKE",
    data: { id },
  }
}

function newAnecdote(content: string) {
  return {
    type: "NEW_ANECDOTE",
    data: {
      content,
    },
  }
}

const initialState = anecdotesAtStart.map(asObject)
interface Action {
  type: string
  data: {
    id: string
    content: string
  }
}

const reducer = (state = initialState, action: Action) => {
  console.log("state now: ", state)
  console.log("action", action)

  switch (action.type) {
    case "ADD_LIKE":
      const anecdote = state.find((anec) => anec.id === action.data.id)
      if (!anecdote) return state
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      const filteredState = state.filter(
        (anec) => anec.id !== updatedAnecdote.id
      )
      return [...filteredState, updatedAnecdote]

    case "NEW_ANECDOTE":
      const newAnecdote = asObject(action.data.content)

      return [...state, newAnecdote]

    default:
      return state
  }
}

export default reducer
export { addLike, newAnecdote }
