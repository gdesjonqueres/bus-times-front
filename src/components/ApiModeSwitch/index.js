import React from 'react'
import { View, Text, Switch } from 'react-native'
import { connect } from 'react-redux'

import {
  setApiStatic,
  setApiRealtime
} from '../../actions'
import { API_MODES } from '../../api/apiConfig'

const ApiModeSwitch = ({
  config,
  net,
  setApiRealtime,
  setApiStatic,
}) => {
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
      <Switch
        value={config.apiMode ==  API_MODES.REALTIME}
        disabled={!net.isServerReachable}
        onValueChange={handleSwitchChange}
      />
    </View>
  )
}

const mapStateToProps = state => ({
  config: state.config,
  net: state.network,
})

const mapDispatchToProps = {
  setApiStatic,
  setApiRealtime,
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiModeSwitch)
