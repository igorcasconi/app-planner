import {TextInputProps} from 'react-native';
import {
  space,
  layout,
  typography,
  color,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
} from 'styled-system';
import styled from 'styled-components/native';

type Props = SpaceProps &
  LayoutProps &
  TypographyProps &
  ColorProps &
  TextInputProps & {};

const InputComponent: React.FC<Props> = styled.TextInput.attrs(
  (props: Props) => ({
    autoCapitalize: 'none',
    ...props,
  }),
)`
  border: 1px solid black;
  color: black;
  padding: 4px 8px;
  border-radius: 4px;
  ${space}
  ${layout}
  ${typography}
  ${color}
`;

export default InputComponent;
