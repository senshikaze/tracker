import { z } from 'zod'

export const battleAddSchema = z.object({
  name: z.string().nonempty().min(2),
  description: z.string(),
})

export type BattleAddSchema = typeof battleAddSchema
