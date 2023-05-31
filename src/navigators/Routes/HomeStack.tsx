import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import { Home, Calendar, Event } from 'src/screens'
import { Button, GradientView, Text } from 'src/components'

import { HomeStackRoutesParams } from 'src/shared/types/routes'
import { Settings } from 'src/screens/Settings'
import { CategoriesTag } from 'src/screens/Settings/CategoriesTag'

const Stack = createStackNavigator<HomeStackRoutesParams>()

const HeaderBackground = () => (
  <GradientView
    width='100%'
    alignItems='center'
    height={50}
    justifyContent='center'
    colorsTheme={['lightGrey', 'gray99', 'secondWhite']}
  />
)

const HeaderText = (text: string) => (
  <Text fontSize={16} fontWeight='bold' textAlign='center' mr={60}>
    {text.toUpperCase()}
  </Text>
)

const HeaderBack = () => {
  const navigation = useNavigation()
  return (
    <Button width={40} height='100%' mt='8px' backgroundColor='transparent' onPress={() => navigation.goBack()}>
      <Ionicons name='chevron-back-outline' size={23} color='black' />
    </Button>
  )
}

const options: StackNavigationOptions = {
  headerBackground: HeaderBackground,
  headerLeft: HeaderBack
}

const HomeSack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Home' component={Home} options={() => ({ headerShown: false })} />
    <Stack.Screen
      name='Calendar'
      component={Calendar}
      options={{ ...options, headerTitle: () => HeaderText('Calendário') }}
    />
    <Stack.Screen
      name='Event'
      component={Event}
      options={{ ...options, headerTitle: () => HeaderText('Detalhes do Evento') }}
    />
    <Stack.Screen
      name='Settings'
      component={Settings}
      options={{ ...options, headerTitle: () => HeaderText('Preferências') }}
    />
    <Stack.Screen
      name='CategoriesTag'
      component={CategoriesTag}
      options={{ ...options, headerTitle: () => HeaderText('Cores/Nomes das categorias') }}
    />
  </Stack.Navigator>
)

export default HomeSack
