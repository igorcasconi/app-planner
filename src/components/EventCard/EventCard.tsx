import React, { Fragment, useMemo } from 'react'
import styled, { css } from 'styled-components/native'
import * as Animatable from 'react-native-animatable'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { compareAsc } from 'date-fns'

import { Row } from '../Row'
import { Text } from '../Text'
import { Column } from '../Column'
import { useUserConfig } from 'src/context'
import { Button } from '../Button'
import { useRealm } from 'src/context/RealmContext'

import { EventsProps } from 'src/shared/interfaces/events'
import { useColors } from 'src/hooks/useColors'
import { formatDateTZ } from 'src/utils'

const EventCard = ({ item, indexList }: { item: EventsProps; indexList: number }) => {
  const navigation = useNavigation()
  const { languageTag } = useUserConfig()
  const getThemeColors = useColors()
  const { getCategory } = useRealm()
  const today = new Date()

  const {
    setEventAsDone,
    categoryId,
    dateTime,
    description,
    name,
    place,
    done,
    index,
    isCalendar,
    setUpdateEventList
  } = item

  const category = useMemo(() => {
    const category = getCategory(categoryId)
    return category
  }, [categoryId])

  const backgroundColor = useMemo(() => {
    const timeHasPassed = compareAsc(today, dateTime)
    const color = timeHasPassed >= 1 && !isCalendar ? category.color + 90 : category.color
    return color
  }, [item])

  return (
    <Row ml={80} mt={indexList === 0 ? 0 : -30}>
      <Button
        backgroundColor='transparent'
        onPress={() =>
          navigation.navigate('Event', {
            eventIndex: index
          })
        }
      >
        <Card animation='bounceInRight' duration={2000} backgroundColor={backgroundColor}>
          <Row width={1} paddingRight={20}>
            <Column width='70%'>
              <Row width={1} mb={1}>
                <Text fontSize={22} numberOfLines={2} fontWeight={600} color={category.text}>
                  {name}
                </Text>
              </Row>
              <Row width={1} mt={1}>
                <Text fontSize={16} color={category.text} numberOfLines={1}>
                  {description}
                </Text>
              </Row>
              <Row width={1} mt={1}>
                <MaterialCommunityIcons name='clock' color={getThemeColors('lightGrey')} size={18} />
                <Text fontSize={14} color={category.text} ml={1}>
                  {dateTime && formatDateTZ(dateTime, 'HH:mm', languageTag)}
                </Text>
              </Row>
              <Row width={1} mt={1}>
                <MaterialCommunityIcons name='map-marker' color={getThemeColors('lightGrey')} size={18} />
                <Text fontSize={14} color={category.text} ml={1}>
                  {place}
                </Text>
              </Row>
            </Column>
            <Column height='100%' justifyContent='center' alignItems='center' mr={20}>
              <Button
                backgroundColor='transparent'
                onPress={() => {
                  if (!!setEventAsDone) {
                    setEventAsDone(index, !done)
                    setUpdateEventList && setUpdateEventList(true)
                  }
                }}
              >
                <Fragment>
                  <MaterialCommunityIcons
                    name={done ? 'checkbox-marked-circle-outline' : 'circle-outline'}
                    color={done ? getThemeColors('greenCheck') : category.text}
                    size={40}
                  />
                  <Text fontSize={16} color={category.text}>
                    {done ? 'Concluído' : 'Não Feito'}
                  </Text>
                </Fragment>
              </Button>
            </Column>
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
    min-height: 150px;
    max-height: 270px;
    margin-top: 8px;
    background-color: ${backgroundColor};
    padding: 16px;
    elevation: 3;
  `
)

export default EventCard
