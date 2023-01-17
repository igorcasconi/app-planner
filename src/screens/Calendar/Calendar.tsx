import React from 'react'
import { FlatList } from 'react-native'

import { Column, Row, Text } from 'src/components'
import { CalendarComponent } from 'src/components/CalendarComponent'
import { EventCard } from 'src/components/EventCard'

import { EventsProps } from 'src/shared/interfaces/events'
import { data } from 'src/utils/event'

const CalendarScreen: React.FC = () => (
  <Column width={1} flex={1}>
    <CalendarComponent />
    <Row width={1} px={16} py={10} backgroundColor='slateBlue'>
      <Text fontSize={14} color='white'>
        Eventos do dia
      </Text>
    </Row>
    <Column width={1} flex={1} height='100%'>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }: { item: EventsProps }) => <EventCard item={{ ...item, isCalendar: true }} />}
      />
    </Column>
  </Column>
)

export default CalendarScreen
