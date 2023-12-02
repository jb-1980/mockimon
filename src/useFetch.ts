import { useReducer, useEffect } from "react"

type IdleState = {
  status: "idle"
  data: undefined
  error: null
}

type PendingState = {
  status: "pending"
  data: undefined
  error: null
}

type ResolvedState<D> = {
  status: "resolved"
  data: D
  error: null
}

type RejectedState = {
  status: "rejected"
  data: undefined
  error: unknown
}

type State<D> = IdleState | PendingState | ResolvedState<D> | RejectedState

enum ACTIONS {
  BEGIN_FETCH = "BEGIN_FETCH",
  FINISH_FETCH = "FINISH_FETCH",
  FETCH_ERROR = "FETCH_ERROR",
}

type Action<D> =
  | {
      type: ACTIONS.BEGIN_FETCH
    }
  | {
      type: ACTIONS.FINISH_FETCH
      payload: D
    }
  | {
      type: ACTIONS.FETCH_ERROR
      payload: unknown
    }

const fetchReducer = <D>(state: State<D>, action: Action<D>): State<D> => {
  switch (action.type) {
    case ACTIONS.BEGIN_FETCH: {
      return { data: undefined, status: "pending", error: null }
    }
    case ACTIONS.FINISH_FETCH: {
      return {
        status: "resolved",
        data: action.payload,
        error: null,
      }
    }
    case ACTIONS.FETCH_ERROR: {
      return { data: undefined, status: "rejected", error: action.payload }
    }
    default:
      return state
  }
}

export const useFetch = <D>(url: string) => {
  const [state, dispatch] = useReducer(fetchReducer<D>, {
    data: undefined,
    status: "idle",
    error: null,
  })

  useEffect(() => {
    if (state.status === "idle") {
      dispatch({ type: ACTIONS.BEGIN_FETCH })
      fetch(url)
        .then((res) => {
          console.log("HELP")
          return res.json()
        })
        .then((json) => {
          console.log(json)
          dispatch({ type: ACTIONS.FINISH_FETCH, payload: json })
        })
        .catch((err) => {
          dispatch({ type: ACTIONS.FETCH_ERROR, payload: err.message })
        })
    }
  }, [url, state.status])

  return state as State<D>
}
