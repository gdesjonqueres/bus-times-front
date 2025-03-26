import NetInfo from '@react-native-community/netinfo'

import { addMinutesToTimeString } from '../utils/utils'

import staticApi from '../api/staticApi'
import realtimeApi from '../api/realtimeApi'
import configApi from '../api/configApi'

import { API_MODES, API_ENDPOINT } from '../api/apiConfig'
import { AT_API, AT_NET, AT_CFG } from './actionTypes'

const mapBusTimesToBusData = (busData, busTimes) => {
  return busTimes.map(info => {
    const id = info.itinary_id + '-' + info.timestamp
    let timeArrival = null
    if (info.minutes) {
      timeArrival = addMinutesToTimeString(info.time, info.minutes)
    }
    return {
      id: id,
      time: info.time,
      timestamp: info.timestamp,
      minutes: info.minutes,
      timeArrival: timeArrival,
      itinary: busData.itinaries[info.itinary_id],
      stop: busData.stops[info.stop_id]
    }
  })
}

const getApi = apiMode => apiMode == API_MODES.REALTIME ? realtimeApi : staticApi
const updateApi = data => {
  console.log('calling updateApi')
  if (typeof data.endpoint !== 'undefined') {
    realtimeApi.setEndpoint(data.endpoint)
  }
  if (typeof data.busData !== 'undefined') {
    staticApi.setData(data.busData)
    realtimeApi.setData(data.busData)
    staticApi.saveData(data.busData)
  }
}

const setBusData = data => ({ type: AT_API.SET_BUS_DATA, payload: data })
const setBusTimes = times => ({ type: AT_API.SET_BUS_TIMES, payload: times })
const setConfig = config => ({ type: AT_CFG.SET_CONFIG, payload: config })
const setNetworkState = state => ({ type: AT_NET.SET_STATE, payload: state })

export const setApiStatic = () => ({ type: AT_API.SET_MODE_STATIC })
export const setApiRealtime = () => {
  return function(dispatch, getState) {
    if (getState().network.isServerReachable) {
      dispatch({ type: AT_API.SET_MODE_REALTIME })
    }
  }
}

export const setApiEndpoint = endpoint => {
  return async function(dispatch) {
    const isReachable = await pingServer(endpoint)
    if (isReachable) {
      updateApi({ endpoint })
      dispatch({ type: AT_API.SET_API_ENDPOINT, payload: endpoint })
    }
    else {
      throw new Error(`Cannot set api endpoint: server ${endpoint} is not acessible.`)
    }
  }
}

export const fetchBusData = () => {
  console.log('call to fetchBusData')
  return async function(dispatch, getState) {
    console.log('fetching data:', getState().config.apiMode)
    dispatch({ type: AT_API.GET_BUS_DATA })
    const api = getApi(getState().config.apiMode)
    const busData = await api.fetchData()
    updateApi({ busData })
    dispatch(setBusData(busData))
    dispatch({ type: AT_API.GET_BUS_DATA_DONE })
  }
}

export const fetchLatestFeed = () => {
  console.log('getting latest bus data')
  return realtimeApi.fetchData()
}

export const updateBusData = busData => {
  return async function(dispatch) {
    console.log('updating bus data')
    updateApi({ busData })
    dispatch(setBusData(busData))
  }
}

export const fetchComingBuses = destination => {
  return async function(dispatch, getState) {
    dispatch({ type: AT_API.GET_BUS_TIMES })
    const api = getApi(getState().config.apiMode)
    try {
      const busTimes = await api.fetchComingBuses(destination)
      dispatch(setBusTimes(mapBusTimesToBusData(getState().busData.data, busTimes)))
      dispatch({ type: AT_API.GET_BUS_TIMES_DONE })
    } catch (e) {
      dispatch(setBusTimes([]))
      dispatch({ type: AT_API.GET_BUS_TIMES_DONE })
      throw e
    }
  }
}

export const loadConfig = () => {
  return async function(dispatch) {
    console.log('loading config')
    const config = await configApi.load()
    if (config) {
      updateApi({ endpoint: config.apiEndpoint })
      dispatch(setConfig(config))
    }
  }
}

export const saveConfig = () => {
  return function(dispatch, getState) {
    return configApi.save(getState().config)
  }
}

export const pingServer = (server = realtimeApi.getEndpoint()) => {
  console.log('polling server', server)
  return realtimeApi.pingServer(server)
}

export const loadNetworkState = () => {
  return async function(dispatch, getState) {
    console.log('loading network state')
    const network = await NetInfo.fetch()
    let state = {
      isConnected: network.isConnected,
      isInternetReachable: network.isInternetReachable,
      isServerReachable: false
    }
    if (state.isInternetReachable) {
      state.isServerReachable = await pingServer()
    }
    await dispatch(setNetworkState(state))
    if (!state.isServerReachable && getState().config.apiMode == API_MODES.REALTIME) {
      dispatch(setApiStatic())
    }
    console.log('finished loading network state.')
  }
}

export const setConnected = () => ({ type: AT_NET.SET_CONNECTED })
export const setInternet = () => ({ type: AT_NET.SET_INTERNET })
export const setServer = () => ({ type: AT_NET.SET_SERVER })
export const setNotConnected = () => {
  return function(dispatch) {
    dispatch({ type: AT_NET.SET_NOT_CONNECTED })
    dispatch(setApiStatic())
  }
}
export const setNoInternet = () => {
  return function(dispatch) {
    dispatch({ type: AT_NET.SET_NO_INTERNET })
    dispatch(setApiStatic())
  }
}
export const setNoServer = () => {
  return function(dispatch) {
    dispatch({ type: AT_NET.SET_NO_SERVER })
    dispatch(setApiStatic())
  }
}

updateApi({ endpoint: API_ENDPOINT})
