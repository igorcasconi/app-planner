import { ViewProps } from 'react-native'
import {
  flexbox,
  space,
  layout,
  color,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  ColorProps,
  BorderProps,
  PositionProps,
  border,
  position
} from 'styled-system'
import styled from 'styled-components/native'

export type Props = FlexboxProps &
  SpaceProps &
  LayoutProps &
  ColorProps &
  ViewProps &
  BorderProps &
  PositionProps &
  object

const ColumnComponent: React.FC<Props> = styled.View`
  ${flexbox}
  ${space}
  ${layout}
  ${color}
  ${border}
  ${position}
`

export default ColumnComponent
