import { AT_API } from '../actions/actionTypes'

const initialState = {
  isFetchingData: false,
  data: require('../data/data.json'),
}

const busData = (state = initialState, action) => {
  switch (action.type) {
    case AT_API.SET_BUS_DATA:
      return {
        ...state,
        data: action.payload,
      }
    case AT_API.GET_BUS_DATA:
      return {
        ...state,
        isFetchingData: true,
      }
    case AT_API.GET_BUS_DATA_DONE:
      return {
        ...state,
        isFetchingData: false,
      }
    default:
      return state
  }
}

export default busData
