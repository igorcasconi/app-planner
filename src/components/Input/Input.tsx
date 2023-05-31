import React, { InputHTMLAttributes } from 'react'
import { TextInput, TextInputProps } from 'react-native'
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
  InputHTMLAttributes<HTMLInputElement> &
  object & {
    errorMessage?: string
    name?: string
  }

const InputComponent = React.forwardRef<TextInput, InputProps>(({ errorMessage, ...props }, ref) => {
  return (
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
  )
})

const StyledInput = styled.TextInput(
  ({ errorMessage }: { errorMessage?: string }) => css`
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
