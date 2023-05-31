import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Column } from '../Column'
import { Row } from '../Row'
import { Text } from '../Text'

interface RadioButtonProps {
  value: string
  selected?: boolean
  label?: string
  onSelect?: Dispatch<SetStateAction<string | undefined>>
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected, value, label, onSelect }) => {
  if (!label) {
    return <Fragment />
  }

  return (
    <TouchableOpacity onPress={() => !!onSelect && onSelect(value)}>
      <Row alignItems='center' mr='8px'>
        <Column width='20px' height='20px' p='2px' border='1px solid' borderRadius='50px' mr='4px'>
          {selected && <Column width='100%' height='100%' backgroundColor='vividAzure' borderRadius='50px' />}
        </Column>
        <Text fontSize={16} color='black'>
          {label}
        </Text>
      </Row>
    </TouchableOpacity>
  )
}

export default RadioButton
