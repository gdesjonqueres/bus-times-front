import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Icon } from 'react-native-elements'

import APP_COLORS from './styles/colors'

import DrawerContent from './components/DrawerContent'
import NetworkStatusIcons from './components/NetworkStatusIcons'
import SplashScreen from './components/SplashScreen'
import DestinationsScreen from './components/DestinationsScreen'
import BusTimesScreen from './components/BusTimesScreen'
import InfoScreen from './components/InfoScreen'

const defNavOpt = {
  headerStyle: {
    backgroundColor: APP_COLORS.primary
  },
  headerTintColor: APP_COLORS.primaryText,
  headerTitleStyle: {
    fontSize: 18,
  },
  headerRight: <NetworkStatusIcons />,
}

const BusTimesNavigator = createStackNavigator(
  {
    Destinations: DestinationsScreen,
    BusTimes: BusTimesScreen
  },
  {
    initialRouteName: 'Destinations',
    defaultNavigationOptions: defNavOpt,
    navigationOptions: {
      drawerLabel: 'Bus to Destinations',
      // drawerIcon: <Icon name='home' type='material-community' color={APP_COLORS.primaryText} />,
      drawerIcon: <Icon name='home' type='material-community' />,
    },
  }
)

const InfoScreenNavigator = createStackNavigator(
  {
    Info: InfoScreen
  },
  {
    defaultNavigationOptions: defNavOpt,
    navigationOptions: {
      drawerLabel: 'About',
      // drawerIcon: <Icon name='information-variant' type='material-community' color={APP_COLORS.primaryText} />,
      drawerIcon: <Icon name='information-variant' type='material-community' />,
    },
  }
)

const AppNavigator = createDrawerNavigator(
  {
    Home: BusTimesNavigator,
    Info: InfoScreenNavigator,
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerContent,
    drawerBackgroundColor: APP_COLORS.darkPrimary,
    contentOptions: {
      // activeTintColor: '#e91e63',
      // itemStyle: {
      //   color: APP_COLORS.primaryText,
      // },
      labelStyle: {
        color: APP_COLORS.primaryText,
      },
      activeLabelStyle: {
        color: APP_COLORS.accent,
      },
      itemsContainerStyle: {
        // marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1,
      },
    }
  }
)

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator,
})

export default function configureNavigation() {
  return createAppContainer(InitialNavigator)
}
