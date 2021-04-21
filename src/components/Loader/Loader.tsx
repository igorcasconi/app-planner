import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

import {Column, Props as ColumnProps} from '../Column';

type Props = ColumnProps & ActivityIndicatorProps;

const Loader: React.FC<Props> = ({size, color, ...props}) => (
  <Column justifyContent="center" alignItems="center" {...props}>
    <ActivityIndicator size={size} color={color} />
  </Column>
);

Loader.defaultProps = {
  size: 'large',
  color: '#000000',
};

export default Loader;
