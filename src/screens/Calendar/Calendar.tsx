import { useIsFocused } from '@react-navigation/native'
import React, { useMemo, useState } from 'react'
import { FlatList } from 'react-native'

import { Column, Row, Text } from 'src/components'
import { CalendarComponent } from 'src/components/CalendarComponent'
import { EventCard } from 'src/components/EventCard'
import { useRealm } from 'src/context/RealmContext'

import { EventsProps } from 'src/shared/interfaces/events'

const CalendarScreen: React.FC = () => {
  const [selectedDay, selectDay] = useState<string>('')
  const { getCurrentEventsOfDay, setEventAsDone } = useRealm()
  const [updateEventList, setUpdateEventList] = useState<boolean>(false)
  const isFocused = useIsFocused()

  const eventData = useMemo(() => {
    const selectedDate = new Date(selectedDay + 'T00:00:00')
    const events = getCurrentEventsOfDay(selectedDate)
    setUpdateEventList(false)
    return events
  }, [selectedDay, updateEventList, isFocused])

  return (
    <Column width={1} flex={1}>
      <CalendarComponent selectDayChildren={selectDay} />
      <Row width={1} px={16} py={10} backgroundColor='slateBlue'>
        <Text fontSize={14} color='white'>
          Eventos do dia
        </Text>
      </Row>
      <Column width={1} flex={1} height='100%'>
        <FlatList
          data={eventData}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item, index }: { item: EventsProps; index: number }) => (
            <EventCard item={{ ...item, setEventAsDone, setUpdateEventList }} indexList={index} />
          )}
        />
      </Column>
    </Column>
  )
}

export default CalendarScreen
