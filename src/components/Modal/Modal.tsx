import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import styled, { css } from 'styled-components/native'
import { Row } from '../Row'

interface ModalProps {
  openModal: boolean
  backgroundColor?: string
}

const windowHeight = Dimensions.get('window').height

const Modal: React.FC<ModalProps> = ({ openModal = false, children, backgroundColor = 'white' }) => {
  const height = useSharedValue(windowHeight)

  const styleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(height.value, {
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
      height.value = windowHeight
      return
    }
    height.value = 0
  }

  useEffect(() => {
    openModalHandler(openModal)
  }, [openModal])

  return (
    <ModalContainer style={styleAnimated}>
      <ModalContent backgroundColor={backgroundColor}>
        <Row width={1} height={16} justifyContent='center' alignItems='center'>
          <StyledIndicator width={40} height='6px' backgroundColor='veryDarkGray' />
        </Row>
        {children}
      </ModalContent>
    </ModalContainer>
  )
}

const ModalContainer = styled(Animated.View)(
  () => css`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 250, 250, 0.5);
    position: absolute;
  `
)

const ModalContent = styled(Animated.View)<{ backgroundColor: string }>(
  ({ backgroundColor }) => css`
    bottom: 0;
    position: absolute;
    height: 80%;
    background-color: ${backgroundColor};
    width: 100%;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding-left: 25px;
    padding-right: 25px;
    elevation: 1;
  `
)

const StyledIndicator = styled(Row)`
  border-radius: 20px;
`

export default Modal
