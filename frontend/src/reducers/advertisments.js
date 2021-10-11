import { GET_ADDS, ADDS_ERROR } from '../actions/types'

const initialState = {
  adds: [],
  loadingadds: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ADDS:
      return {
        ...state,
        adds: payload,
        loadingadds: false,
      }
    case ADDS_ERROR:
      return {
        ...state,
        error: payload,
        loadingadds: false,
      }
    default:
      return state
  }
}
