import React, { Fragment, useEffect, useMemo, useState } from 'react'
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker'
import styled from 'styled-components/native'
import { Alert as AlertReactNative, FlatList } from 'react-native'

import { Alert, Button, Column, Modal, Row, Text, Input, RadioGroup } from 'src/components'
import { useRealm } from 'src/context/RealmContext'
import { CategoriesProps } from 'src/shared/interfaces/settings'
import { Controller, useForm } from 'react-hook-form'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const optionsRadioGroup = [
  { value: '#f8f8f8', label: 'Ghost White' },
  { value: '#111', label: 'Quantum' }
]

const defaultValuesForm = { name: '', color: '#0000ff', text: optionsRadioGroup[0].value }

const styledColorPicker = { width: '90%', height: '50%' }

const CategoriesTag: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [indexCategory, setIndexCategory] = useState<number | null>(null)
  const { createCategory, getCategories, deleteCategory, editCategory } = useRealm()
  const { register, setValue, watch, handleSubmit, reset, control } = useForm<CategoriesProps>({
    defaultValues: defaultValuesForm
  })

  const watchFields = watch(['color', 'text'])

  const onSelectColor = (hex: string) => {
    setValue('color', hex)
  }

  const categoriesData = useMemo(() => {
    const categories = getCategories()
    return categories
  }, [getCategories, openModal, openAlert])

  const onInvalidSubmit = () => {
    AlertReactNative.alert('Necessário que digite o nome da categoria')
  }

  const onSubmit = (values: CategoriesProps) => {
    if (!values.name) {
      onInvalidSubmit()
      return
    }

    if (indexCategory !== null && indexCategory > 0) editCategory(indexCategory, values)
    else createCategory(values)
    reset(defaultValuesForm)
    setOpenModal(false)
  }

  const onResetFields = (index: number) => {
    if (index === 0) return

    const category = categoriesData.find(category => category.index === index)

    if (!category) return
    setOpenModal(true)
    setIndexCategory(category.index)
    reset({ name: category?.name, color: category?.color, text: category?.text })
  }

  useEffect(() => {
    register('color')
    register('text')
  }, [register])

  const ItemCategories = ({ item, index }: { item: CategoriesProps; index: number }) => {
    return (
      <Fragment>
        <Row key={index} width={1} borderBottomWidth={1} p='16px' alignItems='center' justifyContent='space-between'>
          <Row>
            <Column
              width={20}
              height={20}
              backgroundColor={item.color}
              mr={10}
              borderRadius={4}
              justifyContent='center'
              alignItems='center'
            >
              <Text fontSize='16px' color={item.text}>
                A
              </Text>
            </Column>
            <Text fontSize='16px' color='black'>
              {item.name}
            </Text>
          </Row>
          <Row>
            {!item.isDefault && (
              <Fragment>
                <Button
                  backgroundColor='red'
                  width={40}
                  height={40}
                  mr={10}
                  justifyContent='center'
                  onPress={() => {
                    setIndexCategory(item.index)
                    setOpenAlert(true)
                  }}
                >
                  <MaterialCommunityIcons name='trash-can-outline' color='white' size={22} />
                </Button>
                <Button
                  backgroundColor='vividAzure'
                  width={40}
                  height={40}
                  mr={10}
                  justifyContent='center'
                  onPress={() => {
                    onResetFields(item.index)
                  }}
                >
                  <MaterialCommunityIcons name='pencil' color='white' size={22} />
                </Button>
              </Fragment>
            )}
          </Row>
        </Row>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Column flex={1} width={1} height='100%'>
        <Row width={1} mt={-10} p={16} justifyContent='space-between' alignItems='center' backgroundColor='secondWhite'>
          <Text fontSize={20} color='black'>
            Categorias e Cores
          </Text>
          <Button
            width={150}
            height={40}
            backgroundColor='vividAzure'
            justifyContent='center'
            onPress={() => setOpenModal(true)}
          >
            <Text fontSize={14} color='white'>
              Adicionar Categoria
            </Text>
          </Button>
        </Row>
        <Column flex={1} width={1} height='100%' pb={10}>
          <FlatList
            data={categoriesData}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item, index }) => <ItemCategories item={item} index={index} />}
          />
        </Column>
      </Column>
      <Modal openModal={openModal}>
        <Column flex={1} width={1} height='100%' py='20px' alignItems='center'>
          <StyleScrollView>
            <Text fontSize={20} color='black' mb={16}>
              Adicionar Categoria
            </Text>
            <Controller
              name='name'
              control={control}
              render={({ field: { onChange, onBlur, ...inputProps }, fieldState: { error } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  width={1}
                  placeholder='Nome da categoria'
                  mr='10px'
                  errorMessage={error?.message}
                  {...inputProps}
                />
              )}
            />

            <Text fontSize={16} color='black' mt={16} textAlign='left' mb='4px'>
              Selecione a cor da categoria
            </Text>
            <ColorPicker style={styledColorPicker} value={watchFields[0]} onComplete={({ hex }) => onSelectColor(hex)}>
              <Panel1 />
              <HueSlider />
            </ColorPicker>

            <Column width={1} mt='8px'>
              <Text fontSize={16} color='black' mt={16} textAlign='left' mb='4px'>
                Selecione a cor do texto categoria
              </Text>
              <Row mt='4px'>
                <RadioGroup
                  options={optionsRadioGroup}
                  onChange={value => {
                    setValue('text', value)
                  }}
                  value={watchFields[1]}
                  defaultValue={optionsRadioGroup[0].value}
                />
              </Row>
            </Column>

            <Column width={1} mt='8px' mb='14px'>
              <Text fontSize={16} color='black' mt={16} textAlign='left' mb='6px'>
                Exemplo da categoria de evento
              </Text>
              <Column
                width={1}
                height={60}
                backgroundColor={watchFields[0]}
                justifyContent='center'
                px='8px'
                borderRadius='8px'
              >
                <Text fontSize={18} color={watchFields[1]}>
                  Título do evento
                </Text>
              </Column>
            </Column>

            <Row width={1} justifyContent='space-around'>
              <Button
                width={150}
                height={40}
                backgroundColor='red'
                justifyContent='center'
                marginBottom={20}
                onPress={() => {
                  setOpenModal(false)
                  setIndexCategory(null)
                }}
              >
                <Text fontSize={14} color='white'>
                  Cancelar
                </Text>
              </Button>
              <Button
                width={150}
                height={40}
                backgroundColor='vividAzure'
                justifyContent='center'
                marginBottom={20}
                onPress={handleSubmit(onSubmit, onInvalidSubmit)}
              >
                <Text fontSize={14} color='white'>
                  {indexCategory ? 'Editar categoria' : 'Criar categoria'}
                </Text>
              </Button>
            </Row>
          </StyleScrollView>
        </Column>
      </Modal>
      <Alert openAlert={openAlert} height={400} padding={16}>
        <Column width={1} height='100%' justifyContent='center' alignItems='center'>
          <MaterialCommunityIcons name='trash-can-outline' color='red' size={70} />
          <Text fontSize={18} color='veryDarkGray' mt={16}>
            Se existir eventos cadastrados com esta categoria, os mesmos eventos serão alterados para categoria padrão
            do aplicativo. Deseja excluir essa categoria?
          </Text>
          <Row width={1} justifyContent='center' mt={50}>
            <Button
              width={120}
              backgroundColor='veryDarkGray'
              height={40}
              p='8px'
              mr='10px'
              onPress={() => {
                setOpenAlert(false)
                setIndexCategory(null)
              }}
            >
              <Text fontSize={14} color='white'>
                Não
              </Text>
            </Button>
            <Button
              width={140}
              height={40}
              backgroundColor='red'
              p='8px'
              onPress={() => {
                setIndexCategory(null)
                !!indexCategory && deleteCategory(indexCategory)
                setOpenAlert(false)
              }}
            >
              <Row width={1} justifyContent='center' alignItems='center'>
                <Text fontSize={14} color='white' ml='8px'>
                  Sim, excluir!
                </Text>
              </Row>
            </Button>
          </Row>
        </Column>
      </Alert>
    </Fragment>
  )
}

const StyleScrollView = styled.ScrollView`
  width: 100%;
`

export default CategoriesTag
