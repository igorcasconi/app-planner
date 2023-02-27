import React, { useEffect, useState } from 'react'
import { Calendar, LocaleConfig, CalendarProps } from 'react-native-calendars'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Column } from '../Column'
import { Text } from '../Text'

import { formatDateTZ } from 'src/utils'
import { useUserConfig } from 'src/context'
import { format } from 'date-fns'

LocaleConfig.locales['pt-BR'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set.', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
}
LocaleConfig.defaultLocale = 'pt-BR'

const CalendarHeader = ({ date }: { date: any }) => {
  const { languageTag } = useUserConfig()
  return (
    <Column height={20} justifyContent='center' alignItems='center'>
      <Text fontSize={18} color='white'>
        {formatDateTZ(new Date(date), 'MMMM yyyy', languageTag)}
      </Text>
    </Column>
  )
}

const Arrow = ({ direction }: { direction: string }) => {
  const isRight = direction === 'right'
  const iconName = isRight ? 'chevron-forward-outline' : 'chevron-back-outline'
  return (
    <Column
      width={70}
      height={20}
      px={20}
      {...(isRight && { mr: -20, ml: 20 })}
      {...(!isRight && { ml: -21, mr: 20 })}
      justifyContent='center'
      alignItems='center'
    >
      <Ionicons name={iconName} color='white' size={20} />
    </Column>
  )
}

const themeStyle = {
  backgroundColor: '#fefefe',
  calendarBackground: '#fefefe',
  textSectionTitleColor: '#252525',
  'stylesheet.calendar.header': {
    header: {
      backgroundColor: '#1573db',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }
}

const styles = {
  borderWidth: 2,
  borderColor: 'black',
  borderRadius: 8
}

interface CalendarComponentProps extends CalendarProps {
  selectDayChildren?: React.Dispatch<React.SetStateAction<string>>
}

const currentDay = format(new Date(), 'yyyy-MM-dd')

const CalendarComponent: React.FC<CalendarComponentProps> = ({ selectDayChildren, ...props }) => {
  const [selectedDay, selectDay] = useState<string>(currentDay)

  useEffect(() => {
    selectDayChildren && selectDayChildren(selectedDay)
  }, [selectedDay])

  return (
    <Calendar
      current={selectedDay}
      onDayPress={day => selectDay(day.dateString)}
      markingType='custom'
      markedDates={{
        [selectedDay]: {
          customStyles: {
            container: {
              backgroundColor: '#1573db'
            },
            text: {
              color: 'white',
              fontWeight: 'bold'
            }
          }
        }
      }}
      enableSwipeMonths={true}
      //@ts-ignore
      theme={themeStyle}
      renderArrow={direction => <Arrow direction={direction} />}
      renderHeader={date => <CalendarHeader date={date} />}
      styles={styles}
      {...props}
    />
  )
}

export default CalendarComponent
