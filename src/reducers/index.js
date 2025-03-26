import { combineReducers } from 'redux'
import config from './config'
import busData from './busData'
import busTimes from './busTimes'
import network from './network'

export default combineReducers({
  config,
  busData,
  busTimes,
  network,
})
