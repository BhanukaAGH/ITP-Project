import {
  TOGGLE_AMOUNT,
  GET_TOTALS,
  REMOVE_ITEM,
  ADD_ITEM,
} from '../actions/types'

import cartItem from '../data'

const initialState = {
  loading: false,
  cartItems: [],
  total: 0,
  amount: 0,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_ITEM:
      console.log(state.cartItems.filter((item) => item.id === payload.id))
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== payload
        ),
      }
    case TOGGLE_AMOUNT:
      let tempCart = state.cartItems
        .map((cartItem) => {
          if (cartItem._id === payload.id) {
            if (action.payload.type === 'inc') {
              return { ...cartItem, amount: cartItem.amount + 1 }
            }
            if (action.payload.type === 'dec') {
              return { ...cartItem, amount: cartItem.amount - 1 }
            }
          }
          return cartItem
        })
        .filter((cartItem) => cartItem.amount !== 0)
      return { ...state, cartItems: tempCart }
    case GET_TOTALS:
      let { total, amount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem
          const itemTotal = price * amount

          cartTotal.total += itemTotal
          cartTotal.amount += amount
          return cartTotal
        },
        {
          total: 0,
          amount: 0,
        }
      )
      total = parseFloat(total.toFixed(2))

      return { ...state, total, amount }
    default:
      return state
  }
}
