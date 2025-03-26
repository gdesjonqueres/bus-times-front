import { StyleSheet } from 'react-native'
import APP_COLORS from '../../styles/colors'

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  subHeader: {
    backgroundColor: APP_COLORS.darkPrimary,
    height: 0
  },
  header: {
    backgroundColor: APP_COLORS.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: APP_COLORS.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { height: 10 },
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: APP_COLORS.primaryText,
    fontSize: 17,
    flex: 3
  },
  icon: {
    color: APP_COLORS.primaryText,
    fontSize: 10,
  },
  iconsBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default style
