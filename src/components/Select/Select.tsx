import React, { RefObject, useEffect, useState } from 'react'
import { Keyboard, FlatList, ViewProps } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { Text } from '../Text'
import { Row } from '../Row'
import { Props as ColumnProps, Column } from '../Column'
import { Alert } from '../Alert'
import { Button } from '../Button'
import { SelectDataProps } from 'src/shared/types/components'

interface SelectProps {
  placeholder?: string
  selectData: SelectDataProps[]
  onChange?: (value: string | number) => void
  errorMessage?: string
  value: string | number | null
}

const Select = React.forwardRef<RefObject<ViewProps>, ColumnProps & SelectProps>(
  ({ placeholder, selectData, onChange, value, errorMessage, ...props }, ref) => {
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [selectedValue, selectValue] = useState<string | null>(null)

    const onChangeHandler = (value: SelectDataProps) => {
      selectValue(value?.label)
      onChange && onChange(value?.id)
      setOpenAlert(false)
    }

    const renderItemSelect = ({ item }: { item: SelectDataProps }) => (
      <Row width={1} height={45} mb='6px' borderBottomWidth='0.5px' borderBottomColor='lightGrey' alignItems='center'>
        <Button width={1} height='100%' backgroundColor='transparent' p={0} onPress={() => onChangeHandler(item)}>
          <Row width={1} height='100%' alignItems='center'>
            <Column width='10px' height='10px' borderRadius={20} backgroundColor={item.color} mr='8px' />
            <Text fontSize={14}>{item.label}</Text>
          </Row>
        </Button>
      </Row>
    )

    useEffect(() => {
      if (!value) return

      const foundStringValue = selectData.find(data => data.id === value)
      selectValue(foundStringValue?.label ?? null)
    }, [value])

    return (
      <Column width={1} position='relative'>
        <Button
          width={1}
          p={0}
          ml='2px'
          onPress={() => {
            Keyboard.dismiss()
            setOpenAlert(true)
          }}
        >
          <Row
            width={1}
            height={40}
            p='8px'
            borderRadius='4px'
            border='1px solid'
            borderColor={errorMessage ? 'red' : 'black'}
            position='relative'
            {...props}
          >
            {selectedValue ? (
              <Text fontSize={15} color='black'>
                {selectedValue}
              </Text>
            ) : (
              !!placeholder && (
                <Text fontSize={15} color='veryDarkGray'>
                  {placeholder}
                </Text>
              )
            )}
            <Column width={30} height={30} position='absolute' right={0} top='9px'>
              <Ionicons name='chevron-down-outline' size={20} color={errorMessage ? 'red' : 'black'} />
            </Column>
          </Row>
        </Button>
        {!!errorMessage && (
          <Row width={1} position='absolute' bottom={-16} left='6px'>
            <Text fontSize={12} color='red'>
              {errorMessage}
            </Text>
          </Row>
        )}
        <Alert openAlert={openAlert}>
          <Options width={1} height='100%' px={16} pt={20} justifyContent='space-between'>
            <Row width={1} height={20} justifyContent='center' alignItems='center'>
              <Text fontSize={14} color='lightBlack'>
                Selecione uma opção
              </Text>
            </Row>
            <FlatList
              data={selectData}
              keyExtractor={(item: SelectDataProps, index: number) => `${item?.id}-${index}`}
              renderItem={renderItemSelect}
            />
            <Row width={1} height={35} justifyContent='flex-end'>
              <Button width={120} height='100%' backgroundColor='transparent' onPress={() => setOpenAlert(false)} p={0}>
                <Text fontSize={12} color='pink'>
                  CANCELAR
                </Text>
              </Button>
            </Row>
          </Options>
        </Alert>
      </Column>
    )
  }
)

const Options = styled(Column)``

Select.displayName = 'SelectComponent'

export default Select
