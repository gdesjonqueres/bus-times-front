import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import {
  loadConfig,
  loadNetworkState,
  fetchBusData,
} from '../../actions'

import style from './style'

const SplashScreen = ({
  navigation,
  loadConfig,
  loadNetworkState,
  fetchBusData,
}) => {
  useEffect(() => {
    async function init() {
      const timeStart = Date.now()
      console.log('init application data')
      await loadConfig()
      await loadNetworkState()
      console.log('will be fetching bus data')
      await fetchBusData()
      const ellapsedTime = Date.now() - timeStart
      // setTimeout(() => navigation.navigate('App'), 5000)
      console.log('starter time', ellapsedTime)
      if (ellapsedTime < 600) {
        setTimeout(() => navigation.navigate('App'), 1200 - ellapsedTime)
      } else {
        navigation.navigate('App')
      }
    }
    init()
  }, [])

  return (
    <View style={style.mainContainer}>
      <Icon name='bus' type='material-community' size={65} containerStyle={{ marginTop: 80 }} />
      <Text style={[ style.text, style.title ]}>Bus Times</Text>
      <View style={style.centered}>
        {
          // <Text style={[ style.text, { marginTop: 10 } ]}>...Loading...</Text>
        }
        <ActivityIndicator size='large' color='#ffffff' />
      </View>
    </View>
  )
}

const mapDispatchToProps = {
  loadConfig,
  loadNetworkState,
  fetchBusData,
}

export default connect(null, mapDispatchToProps)(SplashScreen)
