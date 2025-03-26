import { AT_NET } from '../actions/actionTypes'

const initialState = {
  isConnected: false,
  isInternetReachable: false,
  isServerReachable: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AT_NET.SET_CONNECTED:
      return {
        ...state,
        isConnected: true,
      }
    case AT_NET.SET_NOT_CONNECTED:
      return {
        ...state,
        isConnected: false,
        isInternetReachable: false,
        isServerReachable: false
      }
    case AT_NET.SET_INTERNET:
      return {
        ...state,
        isConnected: true,
        isInternetReachable: true,
      }
    case AT_NET.SET_NO_INTERNET:
      return {
        ...state,
        isInternetReachable: false,
        isServerReachable: false,
      }
    case AT_NET.SET_SERVER:
      return {
        ...state,
        isServerReachable: true,
        isConnected: true,
        isInternetReachable: true,
      }
    case AT_NET.SET_NO_SERVER:
      return {
        ...state,
        isServerReachable: false,
      }
    case AT_NET.SET_STATE:
      return {
        ...action.payload
      }
    default:
      return state
  }
}
