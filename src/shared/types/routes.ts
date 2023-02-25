import { RouteProp } from '@react-navigation/native'

export type HomeStackRoutesParams = {
  Home: undefined
  Calendar: undefined
  Event: {
    eventIndex: number
  }
}

export type EventRouteParams = RouteProp<HomeStackRoutesParams, 'Event'>
