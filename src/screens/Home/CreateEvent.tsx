import { getHours, getMinutes, set } from 'date-fns'
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Column, DatePicker, Input, Modal, Row, Text, Select } from 'src/components'
import { useRealm } from 'src/context/RealmContext'

import { EventFormProps } from 'src/shared/interfaces/events'
import { EventSchema } from 'src/schemas/events'

interface CreateEventProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setUpdateEventList: Dispatch<SetStateAction<boolean>>
}

const selectData = [
  { id: 'vividAzure', label: 'Vivid azure' },
  { id: 'black', label: 'Black' },
  { id: 'pink', label: 'Pink' },
  { id: 'lightBlack', label: 'Light black' },
  { id: 'slateBlue', label: 'Slate blue' }
]

const CreateEvent: React.FC<CreateEventProps> = ({ openModal, setOpenModal, setUpdateEventList }) => {
  const { createEvent } = useRealm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const { control, handleSubmit } = useForm<EventFormProps>({
    defaultValues: { name: '', date: new Date(), time: new Date() },
    resolver: yupResolver(EventSchema)
  })

  const onSubmit = async (values?: EventFormProps) => {
    if (!values) return

    setLoading(true)
    try {
      const hours = getHours(values.time)
      const minutes = getMinutes(values.time)
      const dateTime = set(values.date, { hours, minutes })
      const payload = {
        ...values,
        dateTime
      }
      await createEvent(payload)
      setUpdateEventList(true)
      setOpenModal(false)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <Modal openModal={openModal}>
        <Column width={1} height='100%' p={10} alignItems='center'>
          <Row width={1} mb={16} justifyContent='center' alignItems='center'>
            <Text fontSize={16} color='black'>
              Criar novo evento
            </Text>
          </Row>
          <Row width={1} alignItems='center' pr={30}>
            <Ionicons name='information-circle-outline' size={24} />
            <Controller
              name='name'
              control={control}
              render={({ field: { onChange, onBlur }, fieldState: { error } }) => {
                return (
                  <Input
                    onBlur={onBlur}
                    width={1}
                    onChangeText={onChange}
                    placeholder='Nome do evento'
                    ml='6px'
                    errorMessage={error?.message}
                  />
                )
              }}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='location-outline' size={24} />
            <Controller
              name='place'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Input width={1} onChangeText={onChange} placeholder='Local' ml='6px' errorMessage={error?.message} />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='chatbox-ellipses-outline' size={24} />
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange } }) => (
                <Input width={1} onChangeText={onChange} placeholder='Descrição (opcional)' ml='6px' />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='today-outline' size={24} />
            <Controller
              name='date'
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker ml='3px' valueDate={new Date(value)} onChangeDate={onChange} />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='alarm-outline' size={24} />
            <Controller
              name='time'
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker valueDate={new Date(value)} ml='3px' mode='time' onChangeDate={onChange} />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='color-palette-outline' size={24} />
            <Controller
              name='colorCard'
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Select
                  ml='6px'
                  placeholder='Selecione a cor'
                  selectData={selectData}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
          </Row>
          <Row width={1} mt={20} justifyContent='center' alignItems='flex-end'>
            <Button
              width={120}
              backgroundColor='pink'
              height={35}
              p='8px'
              onPress={() => setOpenModal(false)}
              disabled={isLoading}
            >
              <Text fontSize={14} color='white'>
                Cancelar
              </Text>
            </Button>
            <Button
              width={120}
              backgroundColor='vividAzure'
              height={35}
              ml={16}
              p='8px'
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              disabled={isLoading}
            >
              <Text fontSize={14} color='white'>
                Criar evento
              </Text>
            </Button>
          </Row>
        </Column>
      </Modal>
    </Fragment>
  )
}

export default CreateEvent
