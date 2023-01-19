import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { compareDesc, isToday } from 'date-fns'

import { Button, Column, GradientView, Row, Text, WeekCalendar } from 'src/components'
import { EventCard } from 'src/components/EventCard'
import CreateEvent from './CreateEvent'

import { EventsProps } from 'src/shared/interfaces/events'
import { useRealm } from 'src/context/RealmContext'
import { ScrollErrorProps } from 'src/shared/types/scroll'
import { useColors } from 'src/hooks/useColors'

const Home: React.FC = () => {
  const navigation = useNavigation()
  const { getCurrentEventsOfDay } = useRealm()
  const getThemeColors = useColors()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedDay, selectDay] = useState<Date | null>(null)
  const eventListRef = useRef<FlatList>(null)

  const eventData = useMemo(() => {
    const events = getCurrentEventsOfDay(selectedDay)
    return events
  }, [selectedDay])

  const scrollToNextItem = useCallback(() => {
    if (!selectedDay) return

    const today = new Date(selectedDay)
    const indexEvent = eventData?.findIndex(event => compareDesc(today, event.dateTime) === 1)
    let indexNextDate

    if (isToday(selectedDay) && !!eventData?.length && indexEvent === -1) indexNextDate = eventData?.length - 1
    else if (isToday(selectedDay) && indexEvent <= eventData?.length - 1) indexNextDate = indexEvent
    else indexNextDate = 0

    eventListRef.current?.scrollToIndex({ animated: true, index: indexNextDate, viewOffset: 1 })
  }, [eventData])

  const scrollToIndexFailed = (error: ScrollErrorProps) => {
    const offset = error.averageItemLength * error.index
    eventListRef.current?.scrollToOffset({ offset })
    setTimeout(() => eventListRef.current?.scrollToIndex({ index: error.index }), 100)
  }

  useEffect(() => {
    scrollToNextItem()
  }, [scrollToNextItem])

  return (
    <Column backgroundColor='veryLightGray' flex={1}>
      <GradientView colorsTheme={['lightGrey', 'gray99', 'secondWhite']}>
        <Column width={1} height={200} px={10} py={20}>
          <Row width={1} height={40} justifyContent='space-between'>
            <Column>
              <Text fontSize={18} fontWeight='bold' color='veryDarkGray'>
                PLANNER APP
              </Text>
              <Row width={1}>
                <Text fontSize={24} fontWeight='bold' color='lightBlack'>
                  SEMANA
                </Text>
              </Row>
            </Column>
            <Row height={20}>
              <Button
                width={80}
                height={40}
                pt='10px'
                backgroundColor='vividAzure'
                mr={10}
                onPress={() => setOpenModal(!openModal)}
              >
                <Text fontSize={12} lineHeight='12px' color='white' fontFamily='Nunito-SemiBold' textAlign='center'>
                  Adicionar evento
                </Text>
              </Button>
              <Button
                backgroundColor='lightGrey'
                width={40}
                height={40}
                onPress={() => navigation.navigate('Calendar')}
              >
                <MaterialCommunityIcons name='calendar-today' color='black' size={22} />
              </Button>
            </Row>
          </Row>
          <Row width={1} mt={16}>
            <WeekCalendar selectDay={selectDay} />
          </Row>
        </Column>
        <Row width={1} justifyContent='center' alignItems='center' height={20} mb={10}>
          <Text fontSize={16} color='black'>
            Próximos eventos do dia
          </Text>
        </Row>
      </GradientView>
      {eventData?.length ? (
        <FlatList
          data={eventData}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          ref={eventListRef}
          renderItem={({ item }: { item: EventsProps }) => <EventCard item={item} />}
          initialNumToRender={20}
          onScrollToIndexFailed={scroll => scrollToIndexFailed(scroll)}
        />
      ) : (
        <Column width={1} height='100%' alignItems='center' mt={60} px={50}>
          <MaterialCommunityIcons name='calendar-check' color={getThemeColors('veryDarkGray')} size={100} />
          <Text fontSize={16} color='veryDarkGray' textAlign='center'>
            Os eventos dessa data já estão concluídos ou não tem nenhum para ser feito!
          </Text>
        </Column>
      )}

      <CreateEvent openModal={openModal} setOpenModal={setOpenModal} />
    </Column>
  )
}

export default Home
