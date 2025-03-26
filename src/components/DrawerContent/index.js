import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native'
import { DrawerNavigatorItems } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements'

import styles from './style'
import APP_COLORS from '../../styles/colors'

const DrawerContent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtons}>
        <Icon
          name='close'
          type='material-community'
          onPress={() => { props.navigation.closeDrawer() }}
          color={APP_COLORS.accent}
        />
      </View>
      <Text style={styles.title}>Bus Times App</Text>
      <View style={styles.drawerItemsContainer}>
        <DrawerNavigatorItems {...props} />
      </View>
    </SafeAreaView>
  </ScrollView>
)

export default DrawerContent
