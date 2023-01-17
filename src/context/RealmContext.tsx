import { isSameDay } from 'date-fns'
import React, { createContext, useState, useContext, useEffect } from 'react'
import Realm from 'realm'

import { EventSchema } from 'src/database'
import { EventsProps } from 'src/shared/interfaces/events'

interface ContextProps {
  realm: Realm | null
  createEvent: (payload?: EventsProps) => void
  getNextIndex: () => number
  getCurrentEventsOfDay: (day: Date | null) => EventsProps[]
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

  const createEvent = (payload?: EventsProps) => {
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
        index: nextIndex
      })
    })
  }

  const getCurrentEventsOfDay = (day: Date | null) => {
    if (!day) return []
    const events = realm?.objects('Event').toJSON() as EventsProps[]
    const currentEventDay = events?.filter(event => isSameDay(event.dateTime, day))
    return currentEventDay
  }

  return (
    <RealmContext.Provider
      value={{
        realm,
        createEvent,
        getNextIndex,
        getCurrentEventsOfDay
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
