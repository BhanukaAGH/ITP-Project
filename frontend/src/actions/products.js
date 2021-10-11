import axios from 'axios'
// import { setAlert } from './alert'

import { GET_PRODUCTS, PRODUCTS_ERROR } from './types'

// get all products
export const getAllProducts = () => async (dispatch) => {
  //   dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/products')

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}
