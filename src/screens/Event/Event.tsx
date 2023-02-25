import React, { useMemo, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Button, Column, Row, Text } from 'src/components'
import { useColors } from 'src/hooks/useColors'
import { useRealm } from 'src/context/RealmContext'
import { format } from 'date-fns'

import { EventRouteParams } from 'src/shared/types/routes'

const Event: React.FC = () => {
  const [updateEventDetail, setUpdateEventDetail] = useState<boolean>(false)
  const getThemeColors = useColors()
  const route = useRoute<EventRouteParams>()
  const { getEventDetail, setEventAsDone } = useRealm()
  const { eventIndex } = route.params

  const eventDetail = useMemo(() => {
    const eventData = getEventDetail(eventIndex)
    const date = format(eventData.dateTime, 'dd/MM/yyyy')
    const hour = format(eventData.dateTime, 'HH:mm')
    setUpdateEventDetail(false)
    return { ...eventData, date, hour }
  }, [eventIndex, updateEventDetail])

  return (
    <Column width={1} height='100%' p={16}>
      <Column width={1} justifyContent='center'>
        <Row width={1} mb={16} justifyContent='space-around'>
          <Column
            width='76%'
            height={30}
            backgroundColor='vividAzure'
            borderRadius={10}
            py={1}
            px={2}
            justifyContent='center'
            mt='4px'
          >
            {/* <Text fontSize={14} color='white'>
              Categoria
            </Text> */}
          </Column>
          <Button backgroundColor='lightGrey' ml='10px' width={40} height={40}>
            <MaterialCommunityIcons name='pencil' color='black' size={22} />
          </Button>
          <Button backgroundColor='red' ml='10px' width={40} height={40}>
            <MaterialCommunityIcons name='trash-can-outline' color='white' size={22} />
          </Button>
        </Row>
      </Column>
      <Column width={1} mt={20} pr='4px' justifyContent='center'>
        <Row width={1} mb={16} justifyContent='space-between'>
          <Text fontSize={24} color='lightBlack'>
            {eventDetail?.name}
          </Text>
        </Row>
      </Column>
      <Column width={1} pr='4px'>
        <Text fontSize={22} color='veryDarkGray'>
          Data
        </Text>
        <Row width={1} alignItems='center'>
          <MaterialCommunityIcons name='calendar-today' color={getThemeColors('lightBlack')} size={20} />
          <Text fontSize={20} ml='8px' color='lightBlack'>
            {eventDetail?.date}
          </Text>
        </Row>
      </Column>
      <Column width={1} pr='4px' mt='16px'>
        <Text fontSize={22} color='veryDarkGray'>
          Horário
        </Text>
        <Row width={1} alignItems='center'>
          <MaterialCommunityIcons name='clock' color={getThemeColors('lightBlack')} size={20} />
          <Text fontSize={20} ml='8px' color='lightBlack'>
            {eventDetail?.hour}
          </Text>
        </Row>
      </Column>
      <Column width={1} mt='16px' pr='4px'>
        <Text fontSize={22} color='veryDarkGray'>
          Local
        </Text>
        <Row width={1} alignItems='center'>
          <MaterialCommunityIcons name='map-marker' color={getThemeColors('lightBlack')} size={20} />
          <Text fontSize={20} ml='8px' color='lightBlack'>
            {eventDetail?.place}
          </Text>
        </Row>
      </Column>
      {!!eventDetail?.description && (
        <Column width={1} mt='16px' pr='4px'>
          <Text fontSize={22} color='veryDarkGray'>
            Descrição
          </Text>
          <Text fontSize={20} color='lightBlack'>
            {eventDetail?.description}
          </Text>
        </Column>
      )}
      <Column width={1} mt={50}>
        <Button
          width={1}
          height={40}
          backgroundColor={eventDetail.done ? 'greenCheck' : 'veryDarkGray'}
          onPress={() => {
            setEventAsDone(eventIndex, !eventDetail.done)
            setUpdateEventDetail(true)
          }}
        >
          <Row width={1} justifyContent='center' alignItems='center'>
            <MaterialCommunityIcons
              name={eventDetail.done ? 'checkbox-marked-circle-outline' : 'circle-outline'}
              color={getThemeColors('white')}
              size={20}
            />
            <Text fontSize={14} color='white' ml='8px'>
              {eventDetail.done ? 'Concluído' : 'Não feito'}
            </Text>
          </Row>
        </Button>
      </Column>
    </Column>
  )
}

export default Event
