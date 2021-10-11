import {
  REMOVE_ITEM,
  TOGGLE_AMOUNT,
  GET_TOTALS,
  ADD_ITEM,
} from '../actions/types'

export const remove = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM, payload: id })
}

export const toggleAmount = (id, type) => (dispatch) => {
  dispatch({ type: TOGGLE_AMOUNT, payload: { id, type } })
}

export const getTotals = () => (dispatch) => {
  dispatch({ type: GET_TOTALS })
}

export const addToCart = (cartItem) => (dispatch) => {
  dispatch({ type: ADD_ITEM, payload: cartItem })
}
