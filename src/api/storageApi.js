import AsyncStorage from '@react-native-community/async-storage'

export default {
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        return JSON.parse(value)
      } else {
        return null
      }
    } catch (e) {
      console.error('error fetching data from store: ' + key, e)
    }
  },

  set: (key, data) => {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('error saving data to store: ' + key, e)
    }
  }
}
