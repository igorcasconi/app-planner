import React, { createContext, useState, useContext, useEffect } from 'react'
import Realm from 'realm'

import { EventSchema } from 'src/database'

interface ContextProps {
  realm: Realm | null
}

const RealmContext = createContext<ContextProps>({} as ContextProps)

const RealmProvider: React.FC = ({ children }) => {
  const [realm, setRealm] = useState<Realm | null>(null)

  // useEffect(() => {
  //   const realmDB = new Realm({ schema: [EventSchema], schemaVersion: 1 })
  //   setRealm(realmDB)
  // }, [])

  return (
    <RealmContext.Provider
      value={{
        realm
      }}
    >
      {children}
    </RealmContext.Provider>
  )
}

const useRealm = () => useContext(RealmContext)

export { RealmProvider, useRealm }
