import { z } from 'zod'

const questionSchema = z.object({
  index: z.number(),
  label: z.string(),
  option: z.union([z.string(), z.array(z.string())]),
  skipped: z.boolean(),
})

const questionnaireSchema = z.array(questionSchema)
const moreInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  gender: z.string(),
  isPregnant: z.boolean(),
})

const formSchema = z.object({
  questionnaire: questionnaireSchema,
  moreInfo: moreInfoSchema,
})

interface FormValue {
  moreInfo: z.infer<typeof moreInfoSchema>
  response: {
    index: number
    label: string
    option: string | string[]
    skipped: boolean
  }[]
}

export { formSchema, moreInfoSchema, questionnaireSchema }
export type { FormValue }
