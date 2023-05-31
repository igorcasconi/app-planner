import { isSameDay } from 'date-fns'
import React, { createContext, useState, useContext, useEffect } from 'react'
import Realm from 'realm'

import { EventSchema, CategoriesSchema } from 'src/database'
import { EventFormProps, EventsProps } from 'src/shared/interfaces/events'
import { CategoriesProps } from 'src/shared/interfaces/settings'
import { stringRealmToArrayJSON } from 'src/utils/event'

interface ContextProps {
  realm: Realm | null
  createEvent: (payload?: EventFormProps) => void
  getNextIndex: (dataTable: string) => number
  getCurrentEventsOfDay: (day: Date | null) => EventsProps[]
  setEventAsDone: (index: number, value: boolean) => void
  getEventDetail: (index: number) => EventsProps
  editEvent: (index: number, payload?: EventFormProps) => void
  deleteEvent: (index: number) => void
  createCategory: (payload?: CategoriesProps) => void
  getCategories: () => CategoriesProps[]
  deleteCategory: (index: number) => void
  editCategory: (index: number, payload?: CategoriesProps) => void
}

const RealmContext = createContext<ContextProps>({} as ContextProps)

const RealmProvider: React.FC = ({ children }) => {
  const [realm, setRealm] = useState<Realm | null>(null)

  useEffect(() => {
    const realmDB = new Realm({ schema: [EventSchema, CategoriesSchema], schemaVersion: 9 })
    setRealm(realmDB)
  }, [])

  const getNextIndex = (dataTable: string) => {
    const events = realm?.objects(dataTable)
    if (events?.length === 0) return 1

    const eventsLength = Number(events?.max('index'))
    return eventsLength + 1
  }

  const createEvent = (payload?: EventFormProps) => {
    if (!payload) return

    const nextIndex = getNextIndex('Event')

    return realm?.write(() => {
      realm.create('Event', {
        name: payload.name,
        description: payload?.description,
        dateTime: payload?.dateTime,
        place: payload?.place,
        alert: true,
        colorCard: payload?.colorCard,
        index: nextIndex,
        done: false
      })
    })
  }

  const createCategory = async (payload?: CategoriesProps) => {
    if (!payload) return

    const nextIndex = getNextIndex('Categories')

    return realm?.write(() => {
      realm.create('Categories', {
        name: payload.name,
        color: payload.color,
        text: payload.text,
        index: nextIndex
      })
    })
  }

  const setEventAsDone = (index: number, value: boolean) => {
    const realmObject = realm?.objects('Event')
    const events = stringRealmToArrayJSON<EventsProps>(realmObject)
    if (!events?.length) return

    const eventIndex = events.findIndex((event: EventsProps) => event.index === index)

    realm?.write(() => {
      //@ts-ignore
      realmObject[eventIndex].done = value
    })
  }

  const editEvent = (index: number, payload?: EventFormProps) => {
    if (!payload) return
    const realmObject = realm?.objects('Event')
    const events = stringRealmToArrayJSON<EventsProps>(realmObject)
    if (!events?.length) return

    const eventIndex = events.findIndex((event: EventsProps) => event.index === index)

    realm?.write(() => {
      //@ts-ignore
      realmObject[eventIndex].name = payload.name
      //@ts-ignore
      realmObject[eventIndex].description = payload?.description
      //@ts-ignore
      realmObject[eventIndex].dateTime = payload?.dateTime
      //@ts-ignore
      realmObject[eventIndex].place = payload?.place
      //@ts-ignore
      realmObject[eventIndex].colorCard = payload?.colorCard
    })
  }

  const deleteEvent = (index: number) => {
    const realmObject = realm?.objects('Event')
    const events = stringRealmToArrayJSON<EventsProps>(realmObject)
    if (!events?.length) return

    const eventIndex = events.findIndex((event: EventsProps) => event.index === index)
    realm?.write(() => !!realmObject && realm?.delete(realmObject[eventIndex]))
  }

  const getCurrentEventsOfDay = (day: Date | null) => {
    if (!day) return []
    const events = stringRealmToArrayJSON<EventsProps>(realm?.objects('Event'))
    const currentEventDay = events?.filter(event => isSameDay(event.dateTime, day))
    return currentEventDay
  }

  const getEventDetail = (index: number) => {
    if (!index) return {} as EventsProps
    const events = stringRealmToArrayJSON<EventsProps>(realm?.objects('Event'))
    const eventDetailWithIndex = events?.filter(event => event.index === index)
    return eventDetailWithIndex[0]
  }

  const getCategories = () => {
    const categories = stringRealmToArrayJSON<CategoriesProps>(realm?.objects('Categories'))
    return categories
  }

  const deleteCategory = (index: number) => {
    const realmObject = realm?.objects('Categories')
    const categories = stringRealmToArrayJSON<CategoriesProps>(realm?.objects('Categories'))

    if (!categories?.length) return

    const categoryIndex = categories.findIndex((category: CategoriesProps) => category.index === index)
    realm?.write(() => !!realmObject && realm?.delete(realmObject[categoryIndex]))
  }

  const editCategory = (index: number, payload?: CategoriesProps) => {
    if (!payload) return
    const realmObject = realm?.objects('Categories')
    const categories = stringRealmToArrayJSON<CategoriesProps>(realmObject)
    if (!categories?.length) return

    const categoryIndex = categories.findIndex((event: CategoriesProps) => event.index === index)

    realm?.write(() => {
      //@ts-ignore
      realmObject[categoryIndex].name = payload.name
      //@ts-ignore
      realmObject[categoryIndex].color = payload?.color
      //@ts-ignore
      realmObject[categoryIndex].text = payload?.text
    })
  }

  return (
    <RealmContext.Provider
      value={{
        realm,
        createEvent,
        getNextIndex,
        getCurrentEventsOfDay,
        setEventAsDone,
        getEventDetail,
        editEvent,
        deleteEvent,
        createCategory,
        getCategories,
        deleteCategory,
        editCategory
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
