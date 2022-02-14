import React from 'react'
import { FlatList } from 'react-native'

import { Column, Row, Text } from 'src/components'
import { CalendarComponent } from 'src/components/CalendarComponent'
import { EventCard } from 'src/components/EventCard'

import { EventProps } from 'src/shared/interfaces/events'
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
        keyExtractor={(item, index) => `${item.eventName}-${index}`}
        renderItem={({ item }: { item: EventProps }) => <EventCard item={item} />}
      />
    </Column>
  </Column>
)

export default CalendarScreen
