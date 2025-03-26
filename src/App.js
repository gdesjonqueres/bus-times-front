/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-native-elements'

import configureStore from './configureStore'
import configureNavigation from './configureNavigation'

import theme from './styles/theme'

const store = configureStore()
const Navigation = configureNavigation()

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
         <Navigation />
      </ThemeProvider>
    </Provider>
  )
}

export default App
