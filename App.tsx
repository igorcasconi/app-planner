import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components/native'

import { Routes } from 'src/navigators'
import theme from 'src/theme'
import { UserConfigProvider } from 'src/context'
import { AreaView } from 'src/components'

const App = () => {
  return (
    <AreaView>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle='dark-content' />
        <UserConfigProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </UserConfigProvider>
      </ThemeProvider>
    </AreaView>
  )
}

export default App
