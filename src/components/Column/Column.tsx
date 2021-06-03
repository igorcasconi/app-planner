import {ViewProps} from 'react-native'
import {
  flexbox,
  space,
  layout,
  color,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  ColorProps
} from 'styled-system'
import styled from 'styled-components/native'

export type Props = FlexboxProps &
  SpaceProps &
  LayoutProps &
  ColorProps &
  ViewProps & {};

const ColumnComponent: React.FC<Props> = styled.View`
  ${flexbox}
  ${space}
  ${layout}
  ${color}
`

export default ColumnComponent
