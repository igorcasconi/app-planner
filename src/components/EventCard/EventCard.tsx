import React, { useMemo } from 'react'
import styled, { css } from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Row } from '../Row'
import { Text } from '../Text'
import { Column } from '../Column'
import { useUserConfig } from 'src/context'

import { EventsProps } from 'src/shared/interfaces/events'
import { formatDateTZ } from 'src/utils'
import { useColors } from 'src/hooks/useColors'
import { compareAsc } from 'date-fns'
import { Button } from '../Button'

const EventCard = ({ item }: { item: EventsProps }) => {
  const { languageTag } = useUserConfig()
  const getThemeColors = useColors()
  const today = new Date()

  const { setEventAsDone, colorCard, dateTime, description, name, place, done, index, isCalendar, setUpdateEventList } =
    item

  const backgroundColor = useMemo(() => {
    const timeHasPassed = compareAsc(today, dateTime)
    const themeColor = getThemeColors(colorCard)
    const color = timeHasPassed >= 1 && !isCalendar ? themeColor + 80 : themeColor
    return color
  }, [item])

  return (
    <Row ml={80}>
      <Button
        backgroundColor='transparent'
        isMultiPress
        onMultiPress={() => {
          if (!!setEventAsDone) {
            setEventAsDone(index, !done)
            setUpdateEventList && setUpdateEventList(true)
          }
        }}
      >
        <Card animation='bounceInRight' duration={2000} backgroundColor={backgroundColor}>
          <Row width={1}>
            <Column width='70%'>
              <Row width={1} mb={0.5}>
                <Text fontSize={22} fontWeight={600} color='white'>
                  {name}
                </Text>
              </Row>
              <Row width={1} mt={1}>
                <Text fontSize={16} color='white' numberOfLines={1}>
                  {description}
                </Text>
              </Row>
              <Row width={1} mt={1}>
                <MaterialCommunityIcons name='clock' color={getThemeColors('lightGrey')} size={18} />
                <Text fontSize={14} color='white' ml={1}>
                  {dateTime && formatDateTZ(dateTime, 'HH:mm', languageTag)}
                </Text>
              </Row>
              <Row width={1} mt={1}>
                <MaterialCommunityIcons name='map-marker' color={getThemeColors('lightGrey')} size={18} />
                <Text fontSize={14} color='white' ml={1}>
                  {place}
                </Text>
              </Row>
            </Column>
            {done && (
              <Column height='100%' justifyContent='center' alignItems='center'>
                <MaterialCommunityIcons
                  name='checkbox-marked-circle-outline'
                  color={getThemeColors('greenCheck')}
                  size={40}
                />
                <Text fontSize={16} color='white'>
                  Concluído
                </Text>
              </Column>
            )}
          </Row>
        </Card>
      </Button>
    </Row>
  )
}

const Card = styled(Animatable.View)(
  ({ backgroundColor }: { backgroundColor: string }) => css`
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
