import { StyleSheet } from 'react-native'
import APP_COLORS from '../../styles/colors'

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: APP_COLORS.darkPrimary,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -100,
  },
  text: {
    color: APP_COLORS.primaryText,
  },
  title: {
    // fontWeight: 'bold',
    fontSize: 28,
    // marginTop: 80,
    marginTop: 10,
  },
})

export default style
