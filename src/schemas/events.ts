import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Campo necessário'
  }
})

export const EventSchema = Yup.object().shape({
  name: Yup.string().required(),
  place: Yup.string().required(),
  description: Yup.string(),
  date: Yup.date().required(),
  time: Yup.date().required(),
  colorCard: Yup.string().required()
}).required()
