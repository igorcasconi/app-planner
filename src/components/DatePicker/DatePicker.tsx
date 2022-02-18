import { format } from 'date-fns'
import React, { useMemo, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { Column } from '../Column'

import { Input } from '../Input'
import { InputProps } from '../Input/Input'

interface DatePickerProps extends InputProps {
  mode?: 'date' | 'datetime' | 'time'
  onChangeDate?: (date: Date) => void
  valueDate: Date
}

const titleModal = 'Selecione a '

const DatePickerComponent: React.FC<DatePickerProps> = ({
  mode = 'date',
  valueDate = new Date(),
  onChangeDate,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(valueDate)

  const formattedDate = useMemo(() => {
    const valueInput = mode === 'date' ? 'dd/MM/yyyy' : 'HH:mm'
    const informationText = mode === 'date' ? 'data' : 'hora'

    return { valueInput, information: titleModal + informationText }
  }, [mode])

  const onSubmitDate = (date: Date) => {
    setOpen(false)
    setDate(date)
    onChangeDate && onChangeDate(date)
  }

  return (
    <Column width={1} {...props}>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={mode}
        title={formattedDate.information}
        androidVariant='iosClone'
        onConfirm={date => {
          onSubmitDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        confirmText='Confirmar'
        cancelText='Cancelar'
      />

      <Input
        width={1}
        height={38}
        value={format(date, formattedDate.valueInput)}
        //@ts-ignore
        onPressOut={() => {
          setOpen(true)
        }}
        showSoftInputOnFocus={false}
        {...props}
      />
    </Column>
  )
}

export default DatePickerComponent
