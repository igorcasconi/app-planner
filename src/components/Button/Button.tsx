import React from 'react'
import { Text, TouchableOpacityProps } from 'react-native'
import { space, layout, color, ColorProps, SpaceProps, LayoutProps, flexbox, FlexboxProps } from 'styled-system'
import styled from 'styled-components/native'

import { Loader } from '../Loader'

type Props = SpaceProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  TouchableOpacityProps & {
    text?: string
    isLoading?: boolean
  }

const ButtonComponent: React.FC<Props> = ({ text, isLoading, disabled, children, ...props }) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading ? <Loader /> : text ? <Text>{text}</Text> : children}
    </Button>
  )
}

const Button = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  align-items: center;
  ${space}
  ${layout}
  ${color}
  ${flexbox}
`

export default ButtonComponent
