import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import NetInfo from '@react-native-community/netinfo'
import {
  setServer,
  setNoServer,
  setConnected,
  setNotConnected,
  setInternet,
  setNoInternet,
  pingServer,
} from './actions'

const withNetworkChecks = WrappedComponent => {
  return function(props) {
    // useEffect(() => {
    //   console.log('loading withNetworkChecks WrappedComponent')
    //   console.log(props)
    // }, [])
    const savedDidItChange = useRef()
    const [logs, setLogs] = useState([])

    const network = useSelector(state => state.network)
    const dispatch = useDispatch()

    const didItChange = (key, value) => {
      const msg = key + ':' + value + ', previous: ' + network[key]
      logMe(msg)
      return value !== network[key]
    }

    const logMe = msg => {
      console.log(msg)
      setLogs(logs => [ ...logs, msg ])
    }

    useEffect(() => {
      savedDidItChange.current = didItChange
    })

    useEffect(() => {
      let pollServerHandler = null
      const pollServer = async () => {
        const isServerReachable = await pingServer()
        if (savedDidItChange.current('isServerReachable', isServerReachable)) {
          isServerReachable ? dispatch(setServer()) : dispatch(setNoServer())
        }
      }
      const handleNetworkChange = state => {
        logMe('New network status: C:' + state.isConnected + '/I:' + state.isInternetReachable)
        if (savedDidItChange.current('isConnected', state.isConnected)) {
          state.isConnected ? dispatch(setConnected()) : dispatch(setNotConnected())
        }
        if (savedDidItChange.current('isInternetReachable', state.isInternetReachable)) {
          state.isInternetReachable ? dispatch(setInternet()) : dispatch(setNoInternet())
          if (state.isInternetReachable && !pollServerHandler) {
            logMe('setting up poll server')
            pollServerHandler = setInterval(pollServer, 5000)
          }
          if (!state.isInternetReachable && pollServerHandler) {
            logMe('removing poll server')
            clearInterval(pollServerHandler)
            pollServerHandler = null
            dispatch(setNoServer())
          }
        }

      }
      const unsubscribNetworkChange = NetInfo.addEventListener(handleNetworkChange)

      console.log('should set up polling?', network.isServerReachable, pollServerHandler)

      if (network.isServerReachable && !pollServerHandler) {
        logMe('setting up poll server')
        pollServerHandler = setInterval(pollServer, 5000)
      }

      return function() {
        console.log('cleaning up network listeners')
        unsubscribNetworkChange()
        clearInterval(pollServerHandler)
      }
    }, [])

    return <WrappedComponent {...props} logs={logs} />
  }
}

export default withNetworkChecks
