import React from 'react'
import { Button } from 'react-native-elements'

import APP_COLORS from '../../styles/colors'

const EditConfigButton = ({ apiEndpoint, disabled, onPress }) => {
  return (
    <Button
      title={apiEndpoint}
      icon={
        disabled
          ? { name: 'pencil-off', type: 'material-community', color: APP_COLORS.secondaryText, size:13 }
          : { name: 'pencil', type: 'material-community', color: APP_COLORS.darkPrimary, size:13 }
      }
      iconRight
      type='clear'
      buttonStyle={{ padding: 0, margin: 0, backgroundColor: 'transparent' }}
      containerStyle={{ padding:0, margin: 0 }}
      titleStyle={{ fontSize: 13 }}
      disabled={disabled}
      onPress={onPress}
    />
  )
}

export default EditConfigButton
