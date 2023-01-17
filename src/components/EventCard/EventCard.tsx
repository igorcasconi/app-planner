import React, { useMemo } from 'react'
import styled, { css } from 'styled-components/native'
import * as Animatable from 'react-native-animatable'

import { Row } from '../Row'
import { Text } from '../Text'
import { useUserConfig } from 'src/context'

import { EventsProps } from 'src/shared/interfaces/events'
import { formatDateTZ } from 'src/utils'
import { useColors } from 'src/hooks/useColors'
import { compareAsc } from 'date-fns'

const EventCard = ({ item }: { item: EventsProps }) => {
  const { languageTag } = useUserConfig()
  const getThemeColors = useColors()
  const today = new Date()

  const backgroundColor = useMemo(() => {
    const timeHasPassed = compareAsc(today, item.dateTime)
    const themeColor = getThemeColors(item.colorCard)
    const color = timeHasPassed >= 1 && !item.isCalendar ? themeColor + 80 : themeColor
    return color
  }, [item])

  return (
    <Row ml={80}>
      <Card animation='bounceInRight' duration={2000} backgroundColor={backgroundColor}>
        <Row width={1} mb={0.5}>
          <Text fontSize={22} fontWeight={600} color='white'>
            {item.name}
          </Text>
        </Row>
        <Row width={1}>
          <Text fontSize={14} color='white'>
            {item.dateTime && formatDateTZ(item.dateTime, 'HH:mm', languageTag)}
          </Text>
        </Row>
      </Card>
    </Row>
  )
}

const Card = styled(Animatable.View)<{ backgroundColor: string }>(
  ({ backgroundColor }) => css`
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 400px;
    height: 150px;
    margin-top: 8px;
    background-color: ${backgroundColor};
    padding: 16px;
    elevation: 3;
  `
)

export default EventCard
