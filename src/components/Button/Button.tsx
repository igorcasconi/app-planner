import React from 'react';
import {Text, TouchableOpacityProps} from 'react-native';
import {
  space,
  layout,
  color,
  ColorProps,
  SpaceProps,
  LayoutProps,
} from 'styled-system';
import styled from 'styled-components/native';

import {Loader} from '../Loader';

type Props = SpaceProps &
  LayoutProps &
  ColorProps &
  TouchableOpacityProps & {
    text: string;
    isLoading: boolean;
  };

const ButtonComponent: React.FC<Props> = ({
  text,
  isLoading,
  disabled,
  ...props
}) => (
  <Button disabled={isLoading || disabled} {...props}>
    {isLoading ? <Loader /> : <Text>{text}</Text>}
  </Button>
);

const Button = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  align-items: center;
  ${space}
  ${layout}
  ${color}
`;

export default ButtonComponent;
