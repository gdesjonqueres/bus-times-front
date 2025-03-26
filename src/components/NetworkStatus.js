import React, { useEffect } from 'react'
import { View, Text, Switch } from 'react-native'
import { connect } from 'react-redux'

import NetInfo from '@react-native-community/netinfo'

import {
  pingServer,
  setConnected,
  setNotConnected,
  setInternet,
  setNoInternet,
  setServer,
  setNoServer,
  setApiStatic,
  setApiRealtime,
} from '../actions'

import { API_MODES } from '../api/apiConfig'

const NetworkStatus = ({
  net,
  config,
  setConnected,
  setNotConnected,
  setInternet,
  setNoInternet,
  setServer,
  setNoServer,
  setApiStatic,
  setApiRealtime,
}) => {
  useEffect(() => {
    pollServerHandler = null
    pollServer = async () => {
      const isServerReachable = await pingServer()
      isServerReachable ? setServer() : setNoServer()
    }
    handleNetworkChange = state => {
      state.isConnected ? setConnected() : setNotConnected()
      state.isInternetReachable ? setInternet() : setNoInternet()
      if (state.isInternetReachable && !pollServerHandler) {
        pollServerHandler = setInterval(pollServer, 5000)
      }
      if (!state.isInternetReachable && pollServerHandler) {
        clearInterval(pollServerHandler)
        pollServerHandler = null
        setNoServer()
      }
    }
    unsubscribNetworkChange = NetInfo.addEventListener(handleNetworkChange)

    return function() {
      unsubscribNetworkChange()
      clearInterval(pollServerHandler)
    }
  }, [])

  const renderBool = bool => bool ? 'Y' : 'N'

  const handleSwitchChange = value => {
    if (value) {
      setApiRealtime()
    }
    else {
      setApiStatic()
    }
  }

  return (
    <View>
      <Text>
        C/I/S ->
        { renderBool(net.isConnected) }/
        { renderBool(net.isInternetReachable) }/
        { renderBool(net.isServerReachable) }
      </Text>
      <Text>
        Api Mode: { config.apiMode }
      </Text>
      <Switch
        value={ config.apiMode ==  API_MODES.REALTIME }
        disabled={ !net.isServerReachable }
        onValueChange={ handleSwitchChange }
      />
    </View>
  )
}

const mapStateToProps = state => ({
  config: state.config,
  net: state.network,
})

const mapDispatchToProps = {
  setConnected,
  setNotConnected,
  setInternet,
  setNoInternet,
  setServer,
  setNoServer,
  setApiStatic,
  setApiRealtime,
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkStatus)
