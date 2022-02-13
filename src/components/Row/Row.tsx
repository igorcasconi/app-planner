import React from 'react'

import { Column, Props as ColumnProps } from '../Column'

type Props = ColumnProps & object

const RowComponent: React.FC<Props> = props => <Column flexDirection='row' {...props} />

export default RowComponent
