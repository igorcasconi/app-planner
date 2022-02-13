import React from 'react'
import { FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'

import { Column, Row, Text, WeekCalendar } from 'src/components'
import { EventCard } from 'src/components/EventCard'

import { EventProps } from 'src/shared/interfaces/events'
import { useColors } from 'src/hooks/useColors'

const data = [
  {
    eventName: 'Reunião Formatura',
    color: 'vividAzure',
    date: new Date(),
    place: 'Discord'
  },
  {
    eventName: 'Reunião Formatura',
    color: 'pink',
    date: new Date(),
    place: 'Discord'
  },
  {
    eventName: 'Reunião Formatura',
    color: 'slateBlue',
    date: new Date(),
    place: 'Discord'
  },
  {
    eventName: 'Reunião Formatura',
    color: 'vividAzure',
    date: new Date(),
    place: 'Discord'
  },
  {
    eventName: 'Reunião Formatura',
    color: 'vividAzure',
    date: new Date(),
    place: 'Discord'
  }
]

const Home: React.FC = () => {
  const getThemeColors = useColors()
  return (
    <Column backgroundColor='veryLightGray' height='100%' flex={1}>
      <ViewGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.8, 1]}
        colors={[getThemeColors('lightGrey'), getThemeColors('gray99'), getThemeColors('secondWhite')]}
      >
        <Column width={1} height={220} px={10} py={20}>
          <Row width={1}>
            <Text fontSize={18} fontWeight='bold' color='veryDarkGray'>
              PLANNER APP
            </Text>
          </Row>
          <Row width={1}>
            <Text fontSize={24} fontWeight='bold' color='lightBlack'>
              SEMANA
            </Text>
          </Row>
          <Row width={1} mt={16}>
            <WeekCalendar />
          </Row>
        </Column>
      </ViewGradient>
      <Row width={1} height='100%' flex={1}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.eventName}-${index}`}
          renderItem={({ item }: { item: EventProps }) => <EventCard item={item} />}
        />
      </Row>
    </Column>
  )
}

const ViewGradient = styled(LinearGradient)`
  width: 100%;
  height: 220px;
`

export default Home
