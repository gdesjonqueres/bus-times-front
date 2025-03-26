import storage from './storageApi'
import { parseTime } from '../utils/utils'

const STORAGE_BUSTIMES_KEY = '@bustimes'
const defaultData = require('../data/data.json')

const getService = date => {
  const wd = date.getDay()
  if (wd === 0) {
    return 'Sun'
  } else if (wd === 6) {
    return 'Sat'
  }
  return 'M-F'
}

// const _getComingBuses = (date, busData, itinaries, timeFrame) => {
//   const service = getService(date)
//   const timeNow = date.toTimeString().substring(0, 5)
//   // let comingBuses = {}
//   let comingBuses = []
//
//   for (const itinary of itinaries) {
//     const stopId = itinary.stop_id
//     const stopTimes = Object.keys(busData.times[stopId][service]).sort()
//
//     for (const stopTime of stopTimes) {
//       if (stopTime < timeNow) {
//         continue
//       } else {
//         let hour, minutes
//         [ hour, minutes ] = stopTime.split(':')
//         hour = parseInt(hour, 10)
//         minutes = parseInt(minutes, 10)
//         const stopDate = new Date(
//           date.getFullYear(),
//           date.getMonth(),
//           date.getDate(),
//           hour,
//           minutes
//         )
//         if (stopDate.getTime() > date.getTime() + timeFrame) {
//           break
//         }
//         // if (!(stopTime in comingBuses)) {
//         //   comingBuses[stopTime] = []
//         // }
//         // comingBuses[stopTime].push(itinary)
//         const timeNum = hour * 100 + minutes
//         const id = itinary.itinary_id + '-' + timeNum
//         let itinaryInfo = {
//           id: id,
//           time: stopTime,
//           timeNum: timeNum,
//           itinary: busData.itinaries[itinary.itinary_id],
//           stop: busData.stops[itinary.stop_id]
//         }
//         comingBuses.push(itinaryInfo)
//       }
//     }
//   }
//
//   // return sortByKeys(comingBuses)
//   comingBuses.sort((e1, e2) => e1.timeNum - e2.timeNum)
//
//   return comingBuses
// }

const _getComingBuses = (date, busData, itinaries, timeFrame) => {
  const service = getService(date)
  const timeNow = date.toTimeString().substring(0, 5)
  let comingBuses = []

  for (const itinary of itinaries) {
    const stopId = itinary.stop_id
    const stopTimes = Object.keys(busData.times[stopId][service]).sort()

    for (const stopTime of stopTimes) {
      if (stopTime < timeNow) {
        continue
      } else {
        const [ hours, minutes ] = parseTime(stopTime)
        const stopDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hours,
          minutes
        )
        if (stopDate.getTime() > date.getTime() + timeFrame) {
          break
        }
        comingBuses.push({
          time: stopTime,
          timestamp: stopDate.getTime(),
          itinary_id: itinary.itinary_id,
          stop_id: itinary.stop_id,
          minutes: itinary.minutes,
        })
      }
    }
  }

  comingBuses.sort((e1, e2) => e1.timestamp - e2.timestamp)

  return comingBuses
}

export default {
  data: null,

  fetchData: async () => {
    const data = await storage.get(STORAGE_BUSTIMES_KEY)
    if (data) {
      return data
    }
    return defaultData
  },

  setData: data => {
    console.log('setting bus data in static api')
    this.data = data
  },

  getData: data => this.data,

  saveData: data => {
    storage.set(STORAGE_BUSTIMES_KEY, data)
  },

  fetchComingBuses: async (destination, date = new Date(), timeFrame = 1800 * 1000) => {
    console.log('calling api.fetchComingBuses')
    // date.setHours(15)
    const busTimes = await _getComingBuses(date, this.data, destination.itinaries, timeFrame)
    return busTimes
  }
}
