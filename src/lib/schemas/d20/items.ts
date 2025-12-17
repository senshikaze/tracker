import { z } from 'zod'
import { ScoreType } from './stats'

export const AttackType = ['melee', 'ranged'] as const
export const DamageType = ['slashing', 'blugeoning', 'piercing'] as const
export const ItemType = ['weapon', 'armor', 'utility', 'equipment'] as const

// schemas
export const itemSchema = z.object({
  name: z.string(),
  type: z.literal(ItemType),
  description: z.string(),
  magical: z.boolean().optional(),
  attunable: z.boolean().optional(),
})

export const armorSchema = itemSchema.extend({
  ac: z.number().optional(),
  ac_bonus: z.number().optional(),
  dex_penalty: z.number().optional(),
})

export const weaponSchema = itemSchema.extend({
  weapon_type: z.string(),
  damage: z.string().optional(),
  reach: z.number().optional(),
  range: z.string().optional(),
  attack_score: z.literal(ScoreType).optional(),
  attack_type: z.literal(AttackType).optional(),
  damage_type: z.literal(DamageType).optional(),
  damage_die: z.string().optional(),
  properties: z.string().optional(),
  weight: z.number().optional(),
})

// types
export type Item = z.infer<typeof itemSchema>
export type Weapon = z.infer<typeof weaponSchema>

// helpers
export const equipable = (item: Item) =>
  ['weapon', 'armor', 'equipment'].includes(item.type)
