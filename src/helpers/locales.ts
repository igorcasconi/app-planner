import { pt, cs, enUS } from 'date-fns/locale'

export const getLocaleFromString = (languageCode: string) => {
  switch (languageCode) {
    case 'en':
      return enUS
    case 'cs':
      return cs
    default:
    case 'pt':
      return pt
  }
}
