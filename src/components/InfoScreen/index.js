import React, { useState } from 'react'
import { SafeAreaView, View, Alert } from 'react-native'
import { Text, Icon, Overlay, Button, Input } from 'react-native-elements'
import { connect } from 'react-redux'

import MenuButton from '../MenuButton'
import UpdateButton from '../UpdateButton'
import EditConfigButton from '../EditConfigButton'
import ApiModeSwitch from '../ApiModeSwitch'
import EditConfigOverlay from '../EditConfigOverlay'
import globalStyle from '../../styles'
import style from './style'

import APP_COLORS from '../../styles/colors'

import { isInBetweenDates } from '../../utils/utils'

const InfoScreen = ({ config, data, net, updateBusData }) => {
  const [ isOverlayVisible, setIsOverlayVisible ] = useState(false)
  const feedPublished = data.feed_info.published
  const feedBegin = data.feed_info.validity.begin
  const feedEnd = data.feed_info.validity.end

  const isFeedCurrent = () => isInBetweenDates(
    new Date(), new Date(feedBegin), new Date(feedEnd)
  )

  const renderBool = condition => condition ? 'Y' : 'N'

  return (
    <SafeAreaView style={[ globalStyle.mainContainer, { padding: 15 } ]}>
      <View style={{ flex: 1 }}>
        <Text style={style.sectionTitle}>Bus Times App</Text>
        <Text style={{ textAlign: 'center' }}>v{data.version}</Text>
      </View>
      <View style={{ flex: 4 }}>
        <Text style={style.sectionTitle}>Network</Text>
        <View style={style.listItem}>
          <Text>Api Endpoint</Text>
          <EditConfigButton
            apiEndpoint={config.apiEndpoint}
            disabled={!net.isInternetReachable}
            onPress={() => setIsOverlayVisible(true)}
          />
        </View>
        <View style={style.listItem}>
          <Text>Connected</Text>
          <Text>{renderBool(net.isConnected)}</Text>
        </View>
        <View style={style.listItem}>
          <Text>Internet</Text>
          <Text>{renderBool(net.isInternetReachable)}</Text>
        </View>
        <View style={style.listItem}>
          <Text>Server</Text>
          <Text>{renderBool(net.isServerReachable)}</Text>
        </View>
        <View style={style.listItem}>
          <Text>Mode: {config.apiMode.toUpperCase()}</Text>
          <ApiModeSwitch />
        </View>
        <Text style={style.sectionTitle}>Feed Info</Text>
        <View style={style.listItem}>
          <Text>Published</Text>
          <Text>{feedPublished}</Text>
        </View>
        <View style={style.listItem}>
          <Text style={isFeedCurrent() ? style.valid : style.error}>Valid For</Text>
          <Text style={isFeedCurrent() ? style.valid : style.error}>{feedBegin} - {feedEnd}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <UpdateButton disabled={!net.isServerReachable} appVersion={data.version} />
      </View>
      <EditConfigOverlay
        apiEndpoint={config.apiEndpoint}
        isVisible={isOverlayVisible}
        setIsVisible={setIsOverlayVisible}
      />
    </SafeAreaView>
  )
}
InfoScreen.navigationOptions = ({ navigation }) => ({
  title: 'About',
  headerLeft: <MenuButton />,
})

const mapStateToProps = state => ({
  config: state.config,
  data: state.busData.data,
  // isFetchingBusData: state.busData.isFetchingData,
  net: state.network,
})

export default connect(mapStateToProps)(InfoScreen)
