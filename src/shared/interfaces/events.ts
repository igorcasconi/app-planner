import React, { SetStateAction } from 'react'
import { NavigationProp } from '@react-navigation/native'

export interface EventFormProps {
  name: string
  colorCard: string
  date: Date
  time: Date
  place: string
  index?: number
  description?: string
  done?: boolean
  dateTime?: Date
}

export interface EventsProps {
  name: string
  colorCard: string
  dateTime: Date
  place: string
  index: number
  description?: string
  isCalendar?: boolean
  done: boolean
  setEventAsDone?: (index: number, value: boolean) => void
  setUpdateEventList?: React.Dispatch<SetStateAction<boolean>>
}
