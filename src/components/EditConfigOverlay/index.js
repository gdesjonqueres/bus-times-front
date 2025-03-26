import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import { Overlay, Button, Text, Input } from 'react-native-elements'

import { setApiEndpoint } from '../../actions'

import APP_COLORS from '../../styles/colors'

const EditConfigOverlay = ({ apiEndpoint, isVisible, setIsVisible, setApiEndpoint }) => {
  const [ editValue, setEditValue ] = useState(apiEndpoint)
  const [ resetValue, setResetValue ] = useState(apiEndpoint)

  const save = async () => {
    try {
      await setApiEndpoint(editValue)
      setIsVisible(false)
    } catch (e) {
      Alert.alert('Edit Error', e.message)
    }
  }

  useEffect(() => {
    setEditValue(apiEndpoint)
    setResetValue(apiEndpoint)
  }, [ apiEndpoint ])

  const handleOnChange = value => {
    setEditValue(value)
  }

  const cancelAndClose = () => {
    setEditValue(resetValue)
    setIsVisible(false)
  }

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={cancelAndClose}
      height='auto'
    >
      <Text style={{ fontSize: 18, color: APP_COLORS.darkPrimary, textAlign: 'center', marginBottom: 10 }}>Edit Config</Text>
      <Input
        label='Api Endpoint'
        value={editValue}
        leftIcon={ {type: 'material-community', name: 'server-network', color: APP_COLORS.secondaryText, size: 13 }}
        leftIconContainerStyle={{ marginLeft: 0 }}
        inputStyle={{ fontSize: 13 }}
        onChangeText={handleOnChange}
      />
      <Button
        title='Save'
        icon={{ name:'check', type:'material-community', /*size: 14*/  }}
        titleStyle={{ /*fontSize: 14*/ }}
        containerStyle={{ marginTop: 10 }}
        onPress={save}
      />
    </Overlay>
  )
}

const mapDispatchToProps = {
  setApiEndpoint
}

export default connect(null, mapDispatchToProps)(EditConfigOverlay)
