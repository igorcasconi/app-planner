import { isSameDay } from 'date-fns'
import React, { createContext, useState, useContext, useEffect } from 'react'
import Realm from 'realm'

import { EventSchema } from 'src/database'
import { EventFormProps, EventsProps } from 'src/shared/interfaces/events'
import { eventsToJSON } from 'src/utils/event'

interface ContextProps {
  realm: Realm | null
  createEvent: (payload?: EventFormProps) => void
  getNextIndex: () => number
  getCurrentEventsOfDay: (day: Date | null) => EventsProps[]
  setEventAsDone: (index: number, value: boolean) => void
  getEventDetail: (index: number) => EventsProps
  editEvent: (index: number, payload?: EventFormProps) => void
}

const RealmContext = createContext<ContextProps>({} as ContextProps)

const RealmProvider: React.FC = ({ children }) => {
  const [realm, setRealm] = useState<Realm | null>(null)

  useEffect(() => {
    const realmDB = new Realm({ schema: [EventSchema], schemaVersion: 7 })
    setRealm(realmDB)
  }, [])

  const getNextIndex = () => {
    const events = realm?.objects('Event')
    if (events?.length === 0) return 1

    const eventsLength = Number(events?.max('index'))
    return eventsLength + 1
  }

  const createEvent = (payload?: EventFormProps) => {
    if (!payload) return

    const nextIndex = getNextIndex()

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

  const setEventAsDone = (index: number, value: boolean) => {
    const realmObject = realm?.objects('Event')
    const events = eventsToJSON(realmObject)
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
    const events = eventsToJSON(realmObject)
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

  const getCurrentEventsOfDay = (day: Date | null) => {
    if (!day) return []
    const events = eventsToJSON(realm?.objects('Event'))
    const currentEventDay = events?.filter(event => isSameDay(event.dateTime, day))
    return currentEventDay
  }

  const getEventDetail = (index: number) => {
    if (!index) return {} as EventsProps
    const events = eventsToJSON(realm?.objects('Event'))
    const eventDetailWithIndex = events?.filter(event => event.index === index)
    return eventDetailWithIndex[0]
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
        editEvent
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
