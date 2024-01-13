import { Portal } from '@gorhom/portal'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated'
import styled, { css } from 'styled-components/native'
import { space, color, layout } from 'styled-system'

import { Props as ColumnProps } from '../Column'

interface AlertProps {
  openAlert: boolean
}

const windowHeight = Dimensions.get('window').height

const Alert: React.FC<ColumnProps & AlertProps> = ({ children, openAlert, ...props }) => {
  const [isVisibleAlert, setVisibleAlert] = useState<boolean>(false)
  const heightTransition = useSharedValue(0)

  const styleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(heightTransition.value, {
            duration: 500,
            //@ts-ignore
            easing: Easing.bezier(0.25, 0.1, 0.25, 1)
          })
        }
      ]
    }
  })

  const openModalHandler = (stateModal: boolean) => {
    if (!stateModal) {
      heightTransition.value = windowHeight
      setTimeout(() => setVisibleAlert(false), 300)
      return
    }
    heightTransition.value = 170
    setVisibleAlert(true)
  }

  useEffect(() => {
    setTimeout(() => openModalHandler(openAlert), 1000)
  }, [openAlert])

  return isVisibleAlert ? (
    <Portal>
      <AlertContainer testID='alert'>
        <AlertContent {...props} style={styleAnimated}>
          {children}
        </AlertContent>
      </AlertContainer>
    </Portal>
  ) : null
}

const AlertContainer = styled(Animated.View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(193, 193, 193, 0.5);
  padding: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
`

const AlertContent = styled(Animated.View)(
  ({ theme }) => css`
    width: 100%
    height: 300px;
    position: absolute;
    background-color: white;
    top: 0;
    border-radius: 16px;
    border: 1px solid ${theme.colors.lightGrey}
    ${space}
    ${color}
    ${layout}
  `
)

export default Alert
