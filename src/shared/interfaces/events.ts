import React, { SetStateAction } from 'react'

export interface EventFormProps {
  name: string
  categoryId: number | null
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
  categoryId: number
  dateTime: Date
  place: string
  index: number
  description?: string
  isCalendar?: boolean
  done: boolean
  setEventAsDone?: (index: number, value: boolean) => void
  setUpdateEventList?: React.Dispatch<SetStateAction<boolean>>
}
