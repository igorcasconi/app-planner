import React from 'react'
import styled, { css } from 'styled-components/native'
import * as Animatable from 'react-native-animatable'

import { Row } from '../Row'
import { Text } from '../Text'
import { useUserConfig } from 'src/context'

import { EventProps } from 'src/shared/interfaces/events'
import { formatDateTZ } from 'src/utils'
import { useColors } from 'src/hooks/useColors'

const EventCard = ({ item }: { item: EventProps }) => {
  const { languageTag } = useUserConfig()
  const getThemeColors = useColors()

  return (
    <Row ml={80}>
      <Card animation='bounceInRight' duration={4000} backgroundColor={getThemeColors(item.color)}>
        <Row width={1} mb={0.5}>
          <Text fontSize={22} fontWeight={600} color='white'>
            {item.eventName}
          </Text>
        </Row>
        <Row width={1}>
          <Text fontSize={14} color='white'>
            {item.date && formatDateTZ(item.date, 'dd MMMM yyyy', languageTag)}
          </Text>
        </Row>
        <Row width={1}>
          <Text fontSize={14} color='white'>
            {item.date && formatDateTZ(item.date, 'HH:mm', languageTag)}
          </Text>
        </Row>
      </Card>
    </Row>
  )
}

const Card = styled(Animatable.View)<{ backgroundColor: string }>(
  ({ backgroundColor }) => css`
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    width: 400px;
    height: 150px;
    margin-top: 8px;
    background-color: ${backgroundColor};
    padding: 16px;
  `
)

export default EventCard
