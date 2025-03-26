import React from 'react'
import { ListItem } from 'react-native-elements'

const BusTimeList = ({ busTimes }) => {
  return (
    busTimes.map((busTime) => (
      <ListItem
        key={busTime.id}
        leftIcon={{ name: 'schedule', type: 'material' }}
        title={busTime.itinary.route.code}
        rightTitle={busTime.time}
        subtitle={busTime.stop.name}
        rightSubtitle={busTime.timeArrival ? `(${busTime.minutes}m) ${busTime.timeArrival}` : ''}
        bottomDivider
      />
    ))
  )
}

export default BusTimeList
