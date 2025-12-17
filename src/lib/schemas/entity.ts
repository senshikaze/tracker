import { z } from 'zod'
import {
  actionSchema,
  featureSchema,
  scoreSchema,
  skillSchema,
  spellSchema,
} from './d20/stats'
import { itemSchema } from './d20/items'
import { dbRecord } from '$lib/services/database'
import { battleSchema } from './battle'

export const entitySchema = dbRecord.extend({
  name: z.string().optional(),
  description: z.string().optional(),
  background: z.string().optional(),
  player_character: z.boolean().optional(),
  initiative: z.number().optional(),
  total_hp: z.number().optional(),
  ac: z.number().optional(),
  inspiration: z.boolean().optional(),
  proficiency: z.number().optional(),
  speed: z.number().optional(),
  scores: z.array(scoreSchema).optional(),
  skills: z.array(skillSchema).optional(),
  actions: z.array(actionSchema).optional(),
  spells: z.array(spellSchema).optional(),
  features: z.array(featureSchema).optional(),
  inventory: z.array(itemSchema).optional(),
})

export const entityAddSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
})

export const battleEntitySchema = dbRecord.extend({
  battle_id: z.number(),
  entity_id: z.number(),
  total_hp: z.number().optional(),
  current_hp: z.number().optional(),
  initiative: z.number().optional(),
  player_character: z.boolean(),
})

export const battleEntityAddSchema = entityAddSchema.extend({
  battle_id: z.number(),
  entity_id: z.number(),
  total_hp: z.number(),
  initiative: z.number().optional(),
  player_character: z.boolean(),
})

export const battleEntityExtendedSchema = battleEntitySchema.extend({
  battle: z.optional(battleSchema),
  entity: z.optional(entitySchema),
})

export type Entity = z.infer<typeof entitySchema>
export type EntityAddSchema = z.infer<typeof entityAddSchema>

export type BattleEntity = z.infer<typeof battleEntitySchema>
export type BattleEntityExtended = z.infer<typeof battleEntityExtendedSchema>
export type BattleEntityAdd = z.infer<typeof battleEntityAddSchema>
