import { AT_API } from '../actions/actionTypes'

const initialState = {
  isFetchingData: false,
  times: []
}

const busTimes = (state = initialState, action) => {
  switch (action.type) {
    case AT_API.SET_BUS_TIMES:
      // return [
      //   ...state,
      //   ...action.payload
      // ]
      // return action.payload
      return {
        ...state,
        times: action.payload
      }
    case AT_API.GET_BUS_TIMES:
      return {
        ...state,
        isFetchingData: true,
      }
    case AT_API.GET_BUS_TIMES_DONE:
      return {
        ...state,
        isFetchingData: false,
      }
    default:
      return state
  }
}

export default busTimes
