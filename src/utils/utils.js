export const parseTime = timeString => {
  const [ hours, minutes ] = timeString.split(':')
  return [ parseInt(hours, 10), parseInt(minutes, 10) ]
}

export const sortByKeys = obj => (
  Object.keys(obj)
    .sort()
    .reduce(
      (acc, cur) => (acc[cur] = obj[cur], acc), {}
    )
)

export const isInBetweenDates = (date, dateBegin, dateEnd) => {
  return date <= dateEnd && date >= dateBegin
}

export const getDateFromTimeString = timeString => {
  const [ hours, minutes ] = parseTime(timeString)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}

export const addMinutes = (date, minutes) => {
  const newDate = new Date(date.getTime())
  newDate.setMinutes(newDate.getMinutes() + minutes)
  return newDate
}

export const addMinutesToTimeString = (timeString, minutes) => {
  if (typeof minutes == 'string') {
    minutes = parseInt(minutes, 10)
  }
  const date = addMinutes(getDateFromTimeString(timeString), minutes)
  return date.toTimeString().substring(0, 5)
}
