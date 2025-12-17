import { xid, z } from 'zod'

export const ScoreType = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const
export const ScoreRange = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
] as const

// schemas
export const actionSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const featureSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const skillSchema = z.object({
  name: z.string(),
  score: z.literal(ScoreType),
  proficient: z.boolean(),
})

export const saveSchema = z.object({
  score: skillSchema,
  proficient: z.boolean(),
})

export const scoreSchema = z.object({
  type: z.literal(ScoreType),
  score: z.literal(ScoreRange),
  trained: z.boolean(),
})

export const spellSchema = z.object({
  name: z.string(),
  description: z.string(),
})

// types
export type Action = z.infer<typeof actionSchema>
export type Feature = z.infer<typeof featureSchema>
export type Save = z.infer<typeof saveSchema>
export type Score = z.infer<typeof scoreSchema>
export type Skill = z.infer<typeof skillSchema>
export type Spell = z.infer<typeof spellSchema>

// helper methods
export function modifier(score: Score) {
  switch (score.score) {
    case 0:
    case 1:
      return -5
    case 2:
    case 3:
      return -4
    case 4:
    case 5:
      return -3
    case 6:
    case 7:
      return -2
    case 8:
    case 9:
      return -1
    case 10:
    case 11:
      return 0
    case 12:
    case 13:
      return 1
    case 14:
    case 15:
      return 2
    case 16:
    case 17:
      return 3
    case 18:
    case 19:
      return 4
    case 20:
      return 5
  }
}

export const saveBonus = (save: Save, score: Score, proficiency: number) =>
  save.proficient ? modifier(score) + proficiency : modifier(score)

export const skillBonus = (skill: Skill, score: Score, proficiency: number) =>
  skill.proficient ? modifier(score) + proficiency : modifier(score)
