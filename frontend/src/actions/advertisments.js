import axios from 'axios'

import { GET_ADDS, ADDS_ERROR } from './types'

// get all advertisments
export const getAllAdvertisments = () => async (dispatch) => {
  //   dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/add/advertisments')

    dispatch({
      type: GET_ADDS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: ADDS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    })
  }
}
