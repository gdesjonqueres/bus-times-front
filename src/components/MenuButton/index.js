import React from 'react'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

const MenuButton = ({ navigation }) => (
  <Icon
    name='menu'
    type='material-community'
    containerStyle={{ marginLeft: 10 }}
    onPress={() => { navigation.toggleDrawer() }}
  />
)

export default withNavigation(MenuButton)
