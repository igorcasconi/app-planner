import React from 'react'
import { TextInputProps } from 'react-native'
import { space, layout, typography, color, SpaceProps, LayoutProps, TypographyProps, ColorProps } from 'styled-system'
import styled, { css } from 'styled-components/native'
import { Column } from '../Column'
import { Text } from '../Text'
import { Row } from '../Row'

export type InputProps = SpaceProps &
  LayoutProps &
  TypographyProps &
  ColorProps &
  TextInputProps &
  object & {
    errorMessage?: string
  }

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(({ errorMessage, ...props }, ref) => (
  <Column width={1}>
    <StyledInput ref={ref} errorMessage={errorMessage} {...props} />
    {!!errorMessage && (
      <Row width={1} position='absolute' bottom={-14} left='6px'>
        <Text fontSize={12} color='red'>
          {errorMessage}
        </Text>
      </Row>
    )}
  </Column>
))

const StyledInput = styled.TextInput(
  ({ errorMessage }) => css`
    border: 1px solid black;
    color: black;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Nunito';
    position: relative;
    ${!!errorMessage &&
    css`
      border-color: red;
    `}
    ${space}
  ${layout}
  ${typography}
  ${color}
  `
)

InputComponent.displayName = 'InputComponent'

export default InputComponent
