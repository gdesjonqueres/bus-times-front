import React from 'react'
import { View, Text } from 'react-native'
import NetworkStatusIcons from '../NetworkStatusIcons'
import style from './style'

const Header = ({ content }) => {
  return (
    <View style={style.container}>
      <View style={style.subHeader} />
      <View style={style.header}>
        <Text style={style.text}>{content}</Text>
        <NetworkStatusIcons />
      </View>
    </View>
  )
}

export default Header
