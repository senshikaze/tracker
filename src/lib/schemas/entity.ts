import { z } from 'zod'

export const entityAddSchema = z.object({
  name: z.string().nullable(),
  description: z.string().nullable(),
})

export type EntityAddSchema = typeof entityAddSchema
