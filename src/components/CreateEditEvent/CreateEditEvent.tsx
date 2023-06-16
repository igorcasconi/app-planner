import { getHours, getMinutes, set } from 'date-fns'
import React, { Dispatch, Fragment, SetStateAction, useEffect, useState, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Column, DatePicker, Input, Modal, Row, Text, Select } from 'src/components'
import { useRealm } from 'src/context/RealmContext'

import { EventFormProps } from 'src/shared/interfaces/events'
import { EventSchema } from 'src/schemas/events'

interface CreateEditEventProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setUpdateContent?: Dispatch<SetStateAction<boolean>>
  eventIndex?: number
}

const defaultValuesForm = { name: '', date: new Date(), time: new Date(), colorCard: '' }

const CreateEditEvent: React.FC<CreateEditEventProps> = ({ openModal, setOpenModal, setUpdateContent, eventIndex }) => {
  const { createEvent, editEvent, getEventDetail, getCategories } = useRealm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const { control, handleSubmit, reset } = useForm<EventFormProps>({
    defaultValues: defaultValuesForm,
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

      if (eventIndex) {
        await editEvent(eventIndex, payload)
      } else await createEvent(payload)

      setUpdateContent && setUpdateContent(true)
      setOpenModal(false)
      reset(defaultValuesForm)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const selectData = useMemo(() => {
    const categories = getCategories()
    return categories.map(category => ({ id: category.index, label: category.name, color: category.color }))
  }, [])

  useEffect(() => {
    if (!eventIndex) return

    const eventData = getEventDetail(eventIndex)
    const dateTime = eventData.dateTime
    reset({ ...eventData, date: dateTime, time: dateTime })
  }, [eventIndex])

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
              render={({ field: { onChange, onBlur, ...inputProps }, fieldState: { error } }) => {
                return (
                  <Input
                    onBlur={onBlur}
                    width={1}
                    onChangeText={onChange}
                    placeholder='Nome do evento'
                    ml='6px'
                    errorMessage={error?.message}
                    {...inputProps}
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
              render={({ field: { onChange, ...inputProps }, fieldState: { error } }) => (
                <Input
                  width={1}
                  onChangeText={onChange}
                  placeholder='Local'
                  ml='6px'
                  errorMessage={error?.message}
                  {...inputProps}
                />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='chatbox-ellipses-outline' size={24} />
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange, ...inputProps } }) => (
                <Input width={1} onChangeText={onChange} placeholder='Descrição (opcional)' ml='6px' {...inputProps} />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='today-outline' size={24} />
            <Controller
              name='date'
              control={control}
              render={({ field: { onChange, value, ...inputProps } }) => (
                <DatePicker ml='3px' valueDate={value} onChangeDate={onChange} {...inputProps} />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='alarm-outline' size={24} />
            <Controller
              name='time'
              control={control}
              render={({ field: { onChange, value, ...inputProps } }) => (
                <DatePicker valueDate={value} ml='3px' mode='time' onChangeDate={onChange} {...inputProps} />
              )}
            />
          </Row>
          <Row width={1} alignItems='center' pr={30} mt={20}>
            <Ionicons name='color-palette-outline' size={24} />
            <Controller
              name='colorCard'
              control={control}
              render={({ field: { onChange, ...inputProps }, fieldState: { error } }) => (
                <Select
                  ml='6px'
                  placeholder='Selecione a cor'
                  selectData={selectData}
                  onChange={onChange}
                  errorMessage={error?.message}
                  {...inputProps}
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
              onPress={() => {
                reset(defaultValuesForm)
                setOpenModal(false)
              }}
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
                {eventIndex ? 'Editar evento' : 'Criar evento'}
              </Text>
            </Button>
          </Row>
        </Column>
      </Modal>
    </Fragment>
  )
}

export default CreateEditEvent
