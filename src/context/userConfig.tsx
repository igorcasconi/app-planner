import React, { createContext, useContext, useEffect, useState } from 'react'
import * as RNLocalize from 'react-native-localize'

interface UserConfigProps {
  timeZone: string
  languageTag: string
}

const UserConfigContext = createContext<UserConfigProps>({} as UserConfigProps)

const UserConfigProvider: React.FC = props => {
  const [timeZone, setTimeZone] = useState<string>('')
  const [languageTag, setLanguageTag] = useState<string>('')
  const timeZoneDevice = RNLocalize.getTimeZone()
  const locales = RNLocalize.getLocales()

  useEffect(() => {
    setTimeZone(timeZoneDevice)
    setLanguageTag(locales[0].languageCode)
  }, [timeZoneDevice, locales])

  return <UserConfigContext.Provider value={{ timeZone, languageTag }} {...props} />
}

const useUserConfig = () => useContext(UserConfigContext)

export { UserConfigProvider, useUserConfig }
