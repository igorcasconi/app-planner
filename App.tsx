import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components/native'
import { PortalProvider } from '@gorhom/portal'

import { Routes } from 'src/navigators'
import theme from 'src/theme'
import { UserConfigProvider } from 'src/context'
import { AreaView } from 'src/components'
import { RealmProvider } from 'src/context/RealmContext'

const App = () => {
  return (
    <AreaView>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle='dark-content' />
        <PortalProvider>
          <RealmProvider>
            <UserConfigProvider>
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </UserConfigProvider>
          </RealmProvider>
        </PortalProvider>
      </ThemeProvider>
    </AreaView>
  )
}

export default App
