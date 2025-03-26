import React, { useState } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon } from 'react-native-elements'

import {
  fetchLatestFeed,
  updateBusData,
} from '../../actions'

const UpdateButton = ({ disabled, appVersion, updateBusData }) => {
  const [ isUpdating, setIsUpdating ] = useState(false)

  const doUpdate = async () => {
    setIsUpdating(true)
    try {
      const newData = await fetchLatestFeed()
      if (newData.version != appVersion) {
        updateBusData(newData)
        Alert.alert('Update', `Updated to v${newData.version}.`)
      } else {
        Alert.alert('Update', 'No new version available.')
      }
    } catch (e) {
      Alert.alert('Update', 'There was an error when updating: ' + e.message)
    }
    setIsUpdating(false)
  }

  return (
    <Button
      title='Check for Updates'
      icon={<Icon name='update' type='material-community' />}
      disabled={disabled || isUpdating}
      loading={isUpdating}
      onPress={doUpdate}
    />
  )
}

const mapDispatchToProps = {
  updateBusData
}

export default connect(null, mapDispatchToProps)(UpdateButton)
