import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { addDays, eachDayOfInterval, isBefore, isToday, set, startOfWeek } from 'date-fns'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { format, toDate } from 'date-fns-tz'
import * as Animatable from 'react-native-animatable'

import { Column } from '../Column'
import { Row } from '../Row'
import { Text } from '../Text'
import { useUserConfig } from 'src/context'
import { getLocaleFromString } from 'src/helpers/locales'

const animationDate = {
  from: {
    backgroundColor: '#d7d7d7',
    height: '50%',
    elevation: 0,
    marginTop: 0,
    borderRadius: 0,
    width: '60%'
  },
  to: {
    backgroundColor: '#E34280',
    height: '90%',
    elevation: 5,
    marginTop: 17,
    borderRadius: 30,
    width: '80%'
  }
}

interface WeekCalendarProps {
  selectDay?: Dispatch<SetStateAction<Date | null>>
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ selectDay }) => {
  const [activeDate, setActiveDate] = useState<number>(0)
  const { timeZone, languageTag } = useUserConfig()
  const currentDay = new Date()

  const week = useMemo(() => {
    const initialDayWeek = startOfWeek(currentDay, { weekStartsOn: 1 })
    return eachDayOfInterval({ start: initialDayWeek, end: addDays(initialDayWeek, 6) })
  }, [currentDay])

  const selectDateHandler = useCallback(
    (index: number, day: Date) => {
      const selectedDayIsToday = isToday(day)
      const getExactlyDateTime = new Date()
      const selectedDayIsBefore = isBefore(day, currentDay)
      const currentDate = selectedDayIsToday
        ? getExactlyDateTime
        : selectedDayIsBefore
        ? set(day, { hours: 23, minutes: 59, seconds: 59 })
        : set(day, { hours: 0, minutes: 0, seconds: 0 })
      setActiveDate(index)
      selectDay && selectDay(currentDate)
    },
    [currentDay, selectDay]
  )

  useEffect(() => {
    if (!week) return

    const present = toDate(currentDay.setHours(0, 0, 0, 0))
    const getExactlyDateTime = new Date()

    setActiveDate(week.map(Number).indexOf(+present))
    selectDay && selectDay(getExactlyDateTime)
  }, [])

  return (
    <Column width={1}>
      <Row width={1} px={10} justifyContent='center' alignItems='center'>
        {week.map((item, index) => {
          const activeTextColor = activeDate === index ? 'white' : 'black'
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                selectDateHandler(index, item)
              }}
            >
              <Column justifyContent='center' alignItems='center' px={1} width={60} height={130} py={3}>
                <ActiveDate
                  {...(activeDate === index && {
                    animation: animationDate
                  })}
                >
                  {activeDate === index && (
                    <Row mt={10} mb={9}>
                      <Text fontSize={14} fontWeight='bold' color={activeTextColor}>
                        {format(item, 'E', { timeZone, locale: getLocaleFromString(languageTag) })}
                      </Text>
                    </Row>
                  )}
                  <Row mb={9}>
                    <Text fontSize={16} color={activeTextColor}>
                      {format(item, 'dd')}
                    </Text>
                  </Row>

                  {activeDate !== index && (
                    <Text fontSize={12} fontWeight='normal'>
                      {format(item, 'E', { timeZone, locale: getLocaleFromString(languageTag) })}
                    </Text>
                  )}
                </ActiveDate>
              </Column>
            </TouchableOpacity>
          )
        })}
      </Row>
    </Column>
  )
}

const ActiveDate = styled(Animatable.View)`
  align-items: center;
`

export default WeekCalendar
