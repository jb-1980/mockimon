import { useReducer, useEffect } from "react"

type IdleState = {
  status: "idle"
  data: undefined
  error: null
  url: string
}

type PendingState = {
  status: "pending"
  data: undefined
  error: null
  url: string
}

type ResolvedState<D> = {
  status: "resolved"
  data: D
  error: null
  url: string
}

type RejectedState = {
  status: "rejected"
  data: undefined
  error: unknown
  url: string
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
      payload: { url: string }
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
      return {
        data: undefined,
        status: "pending",
        error: null,
        url: action.payload.url,
      }
    }
    case ACTIONS.FINISH_FETCH: {
      return {
        ...state,
        status: "resolved",
        data: action.payload,
        error: null,
      }
    }
    case ACTIONS.FETCH_ERROR: {
      return {
        ...state,
        data: undefined,
        status: "rejected",
        error: action.payload,
      }
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
    url,
  })

  useEffect(() => {
    if (state.status === "idle" || url !== state.url) {
      dispatch({ type: ACTIONS.BEGIN_FETCH, payload: { url } })
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((json: D) => {
          dispatch({ type: ACTIONS.FINISH_FETCH, payload: json })
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            dispatch({ type: ACTIONS.FETCH_ERROR, payload: err.message })
            return
          }
          console.error(err)
          dispatch({ type: ACTIONS.FETCH_ERROR, payload: "Unknown Error" })
        })
    }
  }, [url, state.status, state.url])

  return state
}
