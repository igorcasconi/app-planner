import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Home, Calendar } from 'src/screens'
import { Button, GradientView, Row, Text } from 'src/components'
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()

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
  </Stack.Navigator>
)

export default HomeSack
