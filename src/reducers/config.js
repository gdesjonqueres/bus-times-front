import { AT_API, AT_CFG } from '../actions/actionTypes'
import { API_MODES, API_ENDPOINT } from '../api/apiConfig'

const initialState = {
  apiMode: API_MODES.STATIC,
  apiEndpoint: API_ENDPOINT,
}

const config = (state = initialState, action) => {
  switch (action.type) {
    case AT_API.SET_MODE_STATIC:
      return {
        ...state,
        apiMode: API_MODES.STATIC
      }
    case AT_API.SET_MODE_REALTIME:
      return {
        ...state,
        apiMode: API_MODES.REALTIME
      }
    case AT_API.SET_API_ENDPOINT:
      return {
        ...state,
        apiEndpoint: action.payload
      }
    case AT_CFG.SET_CONFIG:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default config
