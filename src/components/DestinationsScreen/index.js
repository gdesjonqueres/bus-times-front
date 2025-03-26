import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

import {
  saveConfig,
} from '../../actions'

import withNetworkChecks from '../../withNetworkChecks'
import DestinationList from '../DestinationList'
import MenuButton from '../MenuButton'
import globalStyle from '../../styles'
import style from './style'

const DestinationsScreen = ({
  navigation,
  data,
  isFetchingBusData,
  saveConfig,
  logs,
}) => {
  useEffect(() => {
    return function() {
      console.log('saving config...');
      saveConfig()
    }
  }, [])

  const goToBusTimes = destination => {
    navigation.navigate('BusTimes', { destination })
  }

  return (
    <SafeAreaView style={globalStyle.mainContainer}>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={style.scrollView}
      >
        <DestinationList destinations={data.destinations} onPressCallback={goToBusTimes} />
        {
          // <FlatList
          //   data={logs}
          //   renderItem={({item}) => <Text>{item}</Text>}
          // />
        }
      </ScrollView>
    </SafeAreaView>
  )
}
// DestinationsScreen.navigationOptions = () => ({
//   title: 'My Bus Trips',
// })

const mapStateToProps = state => ({
  data: state.busData.data,
  isFetchingBusData: state.busData.isFetchingData,
})

const mapDispatchToProps = {
  saveConfig,
}

const Screen = withNetworkChecks(connect(mapStateToProps, mapDispatchToProps)(DestinationsScreen))
Screen.navigationOptions = ({ navigation }) => ({
  title: 'My Bus Trips',
  headerLeft: <MenuButton />,
})

export default Screen
// export default connect(mapStateToProps)((DestinationsScreen))
