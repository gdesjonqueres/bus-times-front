import { StyleSheet } from 'react-native'

import APP_COLORS from '../../styles/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  drawerItemsContainer: {
    flex: 2,
    marginTop: 20,
  },
  title: {
    color: APP_COLORS.primaryText,
    textAlign: 'center',
    marginTop: 170,
    fontSize: 18,
    fontWeight: 'bold',
  }
})
