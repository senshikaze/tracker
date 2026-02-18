import { dbRecord } from '$lib/services/database'
import { z } from 'zod'

export const battleSchema = dbRecord.extend({
  name: z.string().optional(),
  description: z.string().optional(),
  started: z.boolean().optional(),
  initiative: z.number().optional(),
})

export const battleAddSchema = dbRecord.extend({
  name: z.string().min(3),
  description: z.string().optional(),
})

export type Battle = z.infer<typeof battleSchema>
export type BattleAddSchema = z.infer<typeof battleAddSchema>
