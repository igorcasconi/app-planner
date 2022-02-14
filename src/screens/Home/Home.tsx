import React from 'react'
import { FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Button, Column, GradientView, Row, Text, WeekCalendar } from 'src/components'
import { EventCard } from 'src/components/EventCard'

import { EventProps } from 'src/shared/interfaces/events'
import { useNavigation } from '@react-navigation/native'
import { data } from 'src/utils/event'

const Home: React.FC = () => {
  const navigation = useNavigation()

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
              <Button width={80} height={40} pt='10px' backgroundColor='vividAzure' mr={10}>
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
                <Ionicons name='today' color='black' size={20} />
              </Button>
            </Row>
          </Row>
          <Row width={1} mt={16}>
            <WeekCalendar />
          </Row>
        </Column>
        <Row width={1} justifyContent='center' alignItems='center' height={20} mb={10}>
          <Text fontSize={16} color='black'>
            Próximos eventos do dia
          </Text>
        </Row>
      </GradientView>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.eventName}-${index}`}
        renderItem={({ item }: { item: EventProps }) => <EventCard item={item} />}
      />
    </Column>
  )
}

export default Home
