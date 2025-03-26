import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { ListItem, ButtonGroup, Icon } from 'react-native-elements'

import APP_COLORS from '../../styles/colors'
import style from './style'

const DestinationList = ({ destinations, onPressCallback }) => {
  const [ selectedIndex, setSelectedIndex ] = useState(0)

  const updateIndex = index => {
    setSelectedIndex(index)
  }

  const getCol = index => selectedIndex === index ? APP_COLORS.primaryText : APP_COLORS.secondaryText

  const btnAll = () => <Text style={{ color: getCol(0) }}>All</Text>
  const btnFromHome = () => (
    <View style={style.icons}>
      <Icon name='home' type='material-community' color={getCol(1)} />
      <Icon name='arrow-right' type='material-community' color={getCol(1)} />
      <Icon name='circle-medium' type='material-community' color={getCol(1)} />
    </View>
  )
  const btnToHome = () => (
    <View style={style.icons}>
      <Icon name='circle-medium' type='material-community' color={getCol(2)} />
      <Icon name='arrow-right' type='material-community' color={getCol(2)} />
      <Icon name='home' type='material-community' color={getCol(2)} />
    </View>
  )

  const buttons = [
    { element: btnAll },
    { element: btnFromHome },
    { element: btnToHome },
  ]

  // const buttons = ['All', 'From Home', 'To Home']

  return (
    <View style={{ padding: 0, margin: 0 }}>
      <ButtonGroup
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 'auto', padding: 0, margin: 0}}
      />
      {
        Object.keys(destinations).map((id, index) => {
          if (selectedIndex == 0
            || (selectedIndex == 1 && destinations[id].from === 'Home')
            || (selectedIndex == 2 && destinations[id].to === 'Home')
          ) {
            return <ListItem
              key={id}
              leftIcon={{ name: 'bus', type: 'material-community' }}
              title={destinations[id].from}
              onPress={() => onPressCallback(destinations[id])}
              rightTitle={destinations[id].to}
              chevron
              bottomDivider
              topDivider={index === 0}
            />
          }
        })
      }
    </View>
  )
}

export default DestinationList
