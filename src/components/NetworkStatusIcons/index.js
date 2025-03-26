import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'

import { API_MODES } from '../../api/apiConfig'

import style from './style'

const NetworkStatusIcons = ({ config, net }) => {

  return (
    <View style={style.iconsBar}>
      {
        net.isInternetReachable
          ? <Icon name='wifi' type='material-community' size={20} />
          : <Icon name='wifi-off' type='material-community' size={20} />
      }
      {
        net.isServerReachable
          ? <Icon name='server-network' type='material-community' size={20} />
          : <Icon name='server-network-off' type='material-community' size={20} />
      }
      {
        config.apiMode == API_MODES.REALTIME
          ? <Icon name='sync' type='material-community' size={20} />
          : <Icon name='sync-off' type='material-community' size={20} />
      }
    </View>
  )
}

const mapStateToProps = state => ({
  config: state.config,
  net: state.network,
})

export default connect(mapStateToProps)(NetworkStatusIcons)
