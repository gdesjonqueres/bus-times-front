import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, RefreshControl, Text } from 'react-native'
import { connect } from 'react-redux'

import { fetchComingBuses } from '../../actions'

import BusTimeList from '../BusTimeList'

import globalStyle from '../../styles'

const BusTimesScreen = ({
  navigation,
  busTimes,
  isFetchingBusTimes,
  fetchComingBuses
}) => {
  const destination = navigation.getParam('destination')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchComingBuses(destination)
  }, [])

  const onRefresh = async () => {
    setIsRefreshing(true)
    await fetchComingBuses(destination)
    setIsRefreshing(false)
  }

  // refreshControl={
  //   <RefreshControl
  //     refreshing={isRefreshing}
  //     onRefresh={onRefresh}
  //   />

  const renderBusTimes = () => {
    if (!isFetchingBusTimes) {
      if (busTimes.length) {
        return <BusTimeList busTimes={busTimes} />
      } else {
        return <Text>No buses atm!</Text>
      }
    } else {
      return <Text>Loading...</Text>
    }
  }

  return (
    <SafeAreaView style={globalStyle.mainContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        refreshControl={
          <RefreshControl
            refreshing={isFetchingBusTimes}
            onRefresh={onRefresh}
          />
        }
      >
        {
          renderBusTimes()
        }
      </ScrollView>
    </SafeAreaView>
  )
}
BusTimesScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('destination').name
})

const mapStateToProps = state => ({
  busTimes: state.busTimes.times,
  isFetchingBusTimes: state.busTimes.isFetchingData,
})
const mapDispatchToProps = {
  fetchComingBuses,
}

export default connect(mapStateToProps, mapDispatchToProps)(BusTimesScreen)
