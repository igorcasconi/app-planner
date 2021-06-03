import React from 'react'

import { Column, Text } from 'src/components'

const Home: React.FC = () => (
  <Column flex={1} justifyContent='center' px={10} backgroundColor='veryLightGray'>
    <Text fontSize={40}>Planner App</Text>
  </Column>
)

export default Home
