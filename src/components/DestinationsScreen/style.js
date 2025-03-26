import { StyleSheet } from 'react-native'
import APP_COLORS from '../../styles/colors'

const style = StyleSheet.create({
  scrollView: {
    // backgroundColor: APP_COLORS.lightPrimaryColor
  },
  body: {
    // backgroundColor: APP_COLORS.primary
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
    // color: APP_COLORS.primaryText
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
    // color: APP_COLORS.secondaryText
  },
  highlight: {
    fontWeight: '700'
  }
})

export default style
