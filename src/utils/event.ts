export const data = [
  {
    name: 'Reunião Formatura',
    colorCard: 'vividAzure',
    dateTime: new Date(),
    place: 'Discord'
  },
  {
    name: 'Reunião Formatura',
    colorCard: 'pink',
    dateTime: new Date(),
    place: 'Discord'
  },
  {
    name: 'Reunião Formatura',
    colorCard: 'slateBlue',
    dateTime: new Date(),
    place: 'Discord'
  },
  {
    name: 'Reunião Formatura',
    colorCard: 'vividAzure',
    dateTime: new Date(),
    place: 'Discord'
  },
  {
    name: 'Reunião Formatura',
    colorCard: 'vividAzure',
    dateTime: new Date(),
    place: 'Discord'
  }
]

export const stringRealmToArrayJSON = <Type>(realmObject?: Realm.Results<Realm.Object>) => {
  if (!realmObject) return []
  return realmObject.toJSON() as Type[]
}
