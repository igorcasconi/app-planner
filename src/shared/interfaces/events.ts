export interface EventFormProps {
  name: string
  colorCard: string
  date: Date
  time: Date
  place: string
  index?: number
  description?: string
}

export interface EventsProps {
  name: string
  colorCard: string
  dateTime: Date
  place: string
  index?: number
  description?: string
  isCalendar?: boolean
  done?: boolean
}
