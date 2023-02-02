import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacityProps } from 'react-native'
import { space, layout, color, ColorProps, SpaceProps, LayoutProps } from 'styled-system'
import styled from 'styled-components/native'

import { Loader } from '../Loader'

type Props = SpaceProps &
  LayoutProps &
  ColorProps &
  TouchableOpacityProps & {
    text?: string
    isLoading?: boolean
    delayLongPress?: number
    delayMultiPress?: number
    minMultiPress?: number
    isMultiPress?: boolean
    onMultiPress?: () => void
  }

const ButtonComponent: React.FC<Props> = ({
  text,
  isLoading,
  disabled,
  children,
  delayLongPress,
  delayMultiPress,
  minMultiPress,
  isMultiPress,
  onLongPress,
  onMultiPress,
  onPress,
  ...props
}) => {
  const [lastPress, setLastPress] = useState<any>(null)
  const [pressCount, setPressCount] = useState<number>(0)

  const pressButtonHandler = (evt: any) => {
    if (delayMultiPress && isMultiPress) {
      const now = Date.now()

      setLastPress(now)
      if (now - lastPress <= delayMultiPress) {
        setPressCount(pressCount => pressCount + 1)
      } else {
        setPressCount(1)
      }
    } else {
      onPress && onPress(evt)
    }
  }

  useEffect(() => {
    if (!minMultiPress && !isMultiPress) return

    if (minMultiPress && pressCount > 1 && pressCount >= minMultiPress) {
      setPressCount(0)
      onMultiPress && onMultiPress()
    }
  }, [pressCount, minMultiPress, onMultiPress])

  return (
    <Button
      disabled={isLoading || disabled}
      {...(isMultiPress && {
        delayLongPress,
        onLongPress
      })}
      onPress={pressButtonHandler}
      {...props}
    >
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
`

ButtonComponent.defaultProps = {
  delayLongPress: 1000,
  delayMultiPress: 300,
  minMultiPress: 2
}

export default ButtonComponent
