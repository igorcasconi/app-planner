import React from 'react'
import styled, { css } from 'styled-components/native'

interface SafeAreaViewProps {
  flex?: number
}

const AreaView: React.FC<SafeAreaViewProps> = ({ flex = 1, children }) => (
  <AreaViewComponent flex={flex}>{children}</AreaViewComponent>
)

const AreaViewComponent = styled.SafeAreaView<SafeAreaViewProps>(
  ({ flex }) => css`
    flex: ${flex};
  `
)

export default AreaView
