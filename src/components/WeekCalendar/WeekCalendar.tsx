import React, { useEffect, useMemo, useState } from 'react'
import { addDays, eachDayOfInterval, startOfWeek } from 'date-fns'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { utcToZonedTime, format, toDate } from 'date-fns-tz'
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
    backgroundColor: 'white',
    height: '90%',
    elevation: 5,
    marginTop: 17,
    borderRadius: 30,
    width: '80%'
  }
}

const WeekCalendar: React.FC = () => {
  const [activeDate, setActiveDate] = useState<number>(0)
  const { timeZone, languageTag } = useUserConfig()
  const currentDay = utcToZonedTime(new Date(), timeZone)

  const week = useMemo(() => {
    const initialDayWeek = startOfWeek(currentDay, { weekStartsOn: 1 })
    return eachDayOfInterval({ start: initialDayWeek, end: addDays(initialDayWeek, 6) })
  }, [currentDay])

  const selectDateHandler = (index: number) => {
    setActiveDate(index)
  }

  useEffect(() => {
    if (!week) return

    const present = toDate(currentDay.setHours(0, 0, 0, 0))

    setActiveDate(week.map(Number).indexOf(+present))
  }, [])

  return (
    <Column width={1}>
      <Row width={1} px={10} justifyContent='center' alignItems='center'>
        {week.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log('clicou')
              selectDateHandler(index)
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
                    <Text fontSize={14} fontWeight='bold'>
                      {format(item, 'E', { timeZone, locale: getLocaleFromString(languageTag) })}
                    </Text>
                  </Row>
                )}
                <Row mb={9}>
                  <Text fontSize={16}>{format(item, 'dd')}</Text>
                </Row>

                {activeDate !== index && (
                  <Text fontSize={12} fontWeight='normal'>
                    {format(item, 'E', { timeZone, locale: getLocaleFromString(languageTag) })}
                  </Text>
                )}
              </ActiveDate>
            </Column>
          </TouchableOpacity>
        ))}
      </Row>
    </Column>
  )
}

const ActiveDate = styled(Animatable.View)`
  align-items: center;
`

export default WeekCalendar
