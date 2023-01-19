export const EventSchema = {
  name: 'Event',
  properties: {
    name: 'string',
    description: { type: 'string', optional: true },
    dateTime: 'date',
    place: 'string',
    alert: 'bool',
    colorCard: 'string',
    index: 'int',
    done: 'bool'
  }
}
