import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Button, Column, Text } from 'src/components'

type SettingsMenuProps = {
  name: string
  icon: string
  route: string
}

const settingsMenu: SettingsMenuProps[] = [
  {
    name: 'Cores/Nomes das categorias',
    route: 'CategoriesTag',
    icon: 'tag-multiple-outline'
  }
]

const Settings: React.FC = () => {
  const navigation = useNavigation()
  return (
    <Column flex={1} width={1} height='100%'>
      <FlatList
        data={settingsMenu}
        renderItem={({ item }: { item: SettingsMenuProps; index: number }) => (
          <Column width={1} borderBottomWidth={1} borderBottomColor='veryDarkGray'>
            <Button
              width={1}
              alignItems='center'
              flexDirection='row'
              backgroundColor='veryLightGray'
              onPress={() => navigation.navigate('CategoriesTag')}
            >
              <MaterialCommunityIcons name={item.icon} color='black' size={30} />
              <Text fontSize={16} color='black' ml='4px'>
                {item.name}
              </Text>
            </Button>
          </Column>
        )}
      />
    </Column>
  )
}

export default Settings
