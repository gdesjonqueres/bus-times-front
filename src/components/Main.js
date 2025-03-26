import React, { useEffect } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  loadConfig,
  loadNetworkState,
  saveConfig,
  fetchBusData,
  fetchComingBuses,
  setApiStatic,
  setApiRealtime,
  setApiEndpoint,
} from '../actions'

import NetInfo from '@react-native-community/netinfo'

const Main = ({
  config,
  data,
  busTimes,
  loadConfig,
  loadNetworkState,
  saveConfig,
  fetchBusData,
  fetchComingBuses,
  setApiStatic,
  setApiRealtime,
  setApiEndpoint,
}) => {
  useEffect(() => {
    async function init() {
      await loadConfig()
      await loadNetworkState()
      fetchBusData()
    }
    init()

    return function() {
      console.log('saving config...')
      saveConfig()
    }
  }, [])

  // useEffect(() => {
  //   console.log('calling to fetch data', config.apiMode)
  //   fetchBusData(config.apiMode)
  // }, [config.apiMode])

  const renderBool = bool => bool ? 'Y' : 'N'

  const handleSetApiEndpoint = async endpoint => {
    try {
      await setApiEndpoint(endpoint)
    }
    catch (e) {
      // console.log(e)
      Alert.alert('Server Error', e.message)
    }
  }

  const logComingBuses = async () => {
    await fetchComingBuses(data.destinations['dst01'])
    console.log(busTimes)
  }

  return (
    <View>
      <Text>{ config.apiEndpoint }</Text>
      <Text>{ data.version }</Text>

      <Button onPress={ fetchBusData } title='Get Bus Data' />
      {
      // <Button onPress={ setApiRealtime } title='Switch to Realtime API' />
      // <Button onPress={ setApiStatic } title='Switch to Static API' />
      }
      {
      // <Button onPress={ setConnected } title='Net: Connected' />
      // <Button onPress={ setNotConnected } title='Net: Not Connected' />
      // <Button onPress={ setInternet } title='Net: Internet' />
      // <Button onPress={ setNoInternet } title='Net: No Internet' />
      // <Button onPress={ setServer } title='Net: Server' />
      // <Button onPress={ setNoServer } title='Net: No Server' />
      }
      <Button onPress={ () => handleSetApiEndpoint('http://192.168.1.25:8001') } title='Set to wrong server' />
      <Button onPress={ () => handleSetApiEndpoint('http://192.168.1.25:8000') } title='Set to correct server' />
      <Button onPress={ logComingBuses } title='Log coming buses' />
    </View>
  )
}

const mapStateToProps = state => ({
  config: state.config,
  data: state.busData,
  busTimes: state.busTimes
})
const mapDispatchToProps = {
  loadConfig,
  loadNetworkState,
  saveConfig,
  fetchBusData,
  fetchComingBuses,
  setApiStatic,
  setApiRealtime,
  setApiEndpoint,
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
