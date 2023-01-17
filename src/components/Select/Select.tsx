import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Text } from '../Text'
import { Row } from '../Row'
import { Props as ColumnProps, Column } from '../Column'
import { Alert } from '../Alert'
import { Button } from '../Button'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

type SelectDataProps = { id: string | number; label: string }

interface SelectProps {
  placeholder?: string
  selectData: SelectDataProps[]
  onChange?: (value: string | number) => void
  errorMessage?: string
}

const Select: React.FC<ColumnProps & SelectProps> = ({ placeholder, selectData, onChange, errorMessage, ...props }) => {
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
          <Column width='10px' height='10px' borderRadius={20} backgroundColor={item.id} mr='8px' />
          <Text fontSize={14}>{item.label}</Text>
        </Row>
      </Button>
    </Row>
  )

  return (
    <Column width={1} position='relative'>
      <Button width={1} p={0} ml='2px' onPress={() => setOpenAlert(true)}>
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

const Options = styled(Column)``

export default Select