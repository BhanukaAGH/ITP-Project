import { GET_PRODUCTS, PRODUCTS_ERROR } from '../actions/types'

const initialState = {
  product: null,
  products: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      }
    case PRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
