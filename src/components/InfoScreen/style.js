import { StyleSheet } from 'react-native'
import APP_COLORS from '../../styles/colors'

const style = StyleSheet.create({
  listItem: {
    padding: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionTitle: {
    padding: 8,
    color: APP_COLORS.darkPrimary,
    fontSize: 18,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  valid: { },
  error: {
    fontWeight: 'bold',
    color: APP_COLORS.error
  },
  actionButton: {
    backgroundColor: APP_COLORS.primaryAction,
    // color: APP_COLORS.primaryText
  }
})

export default style
