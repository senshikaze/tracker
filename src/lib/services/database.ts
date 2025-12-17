import type { Battle } from '$lib/schemas/battle'
import type { BattleEntity, Entity } from '$lib/schemas/entity'
import { Dexie, type EntityTable, liveQuery } from 'dexie'
import { z } from 'zod'

const DB_VERSION = 3

export const dbRecord = z.object({
  id: z.number().optional(),
})
export type DBRecord = z.infer<typeof dbRecord>

export const db = new Dexie('tracker') as Dexie & {
  battles: EntityTable<Battle, 'id'>
  entities: EntityTable<Entity, 'id'>
  'battle-entities': EntityTable<BattleEntity, 'id'>
}

db.version(DB_VERSION).stores({
  battles: '++id, name',
  entities: '++id, name',
  'battle-entities': '++id, battle_id, entity_id',
})
