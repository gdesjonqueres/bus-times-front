import { Platform } from 'react-native'
import { colors } from 'react-native-elements'

import APP_COLORS from './colors'

const theme = {
  // colors: {
  //   ...Platform.select({
  //     // default: colors.platform.android,
  //     default: colors.platform.ios,
  //     ios: colors.platform.ios,
  //   }),
  // },
  colors: {
    primary: APP_COLORS.primary,
  },
  Icon: {
    color: APP_COLORS.primaryText
  },
  Button: {
    buttonStyle: {
      // backgroundColor: APP_COLORS.primaryAction,
      backgroundColor: APP_COLORS.accent,
    }
  },
  ButtonGroup: {
    selectedButtonStyle: {
      // backgroundColor: APP_COLORS.primaryAction,
      backgroundColor: APP_COLORS.accent,
    }
  }
}

export default theme
