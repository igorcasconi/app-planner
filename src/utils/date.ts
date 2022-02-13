import { format } from 'date-fns'

import { getLocaleFromString } from 'src/helpers/locales'

export const formatDateTZ = (date: Date, formatType: string, languageTag: string) =>
  format(date, formatType, { locale: getLocaleFromString(languageTag) })
