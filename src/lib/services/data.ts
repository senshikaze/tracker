import type { Battle } from '$lib/schemas/battle'
import type {
  BattleEntity,
  BattleEntityExtended,
  Entity,
} from '$lib/schemas/entity'
import { db } from './database'

/** Battles */
export function getBattles(): Promise<Battle[]> {
  return db.battles.toArray()
}

export function getBattle(id: number): Promise<Battle | undefined> {
  return db.battles.get(id)
}

export function createBattle(data: Battle): Promise<Battle> {
  return db.battles.add(data).then(
    (id) => {
      data.id = id
      return data
    },
    (e) => {
      console.log(e)
      throw e
    },
  )
}

export function deleteBattle(id: number): Promise<void> {
  db['battle-entities'].where('battle_id').equals(id).delete()
  return db.battles.delete(id)
}

export function updateBattle(data: Battle): Promise<Battle> {
  return db.battles.update(data.id, data).then(
    (_) => data,
    (e) => {
      console.log(e)
      throw e
    },
  )
}

/** Battle Entities */
export function deleteBattleEntity(id: number): Promise<void> {
  return db['battle-entities'].delete(id)
}

export async function getBattleEntities(
  battle_id: number,
): Promise<BattleEntityExtended[]> {
  const battleEntities = await db['battle-entities']
    .where('battle_id')
    .equals(battle_id)
    .toArray()

  return await Promise.all(
    battleEntities.map(async (be) => {
      const [entity, battle] = await Promise.all([
        db.entities.get(be.entity_id),
        db.battles.get(be.battle_id),
      ])
      return {
        entity,
        battle,
        ...be,
      } satisfies BattleEntityExtended
    }),
  )
}

export function createBattleEntity(data: BattleEntity): Promise<BattleEntity> {
  if (data.battle_id === undefined || data.entity_id === undefined) {
    return Promise.reject('Must have both battle and entity ids')
  }
  return db['battle-entities'].add(data).then(
    (id) => {
      data.id = id
      return data
    },
    (e) => {
      console.log(e)
      throw e
    },
  )
}

/** Entities */
export function getEntities(): Promise<Entity[]> {
  return db.entities.toArray()
}

export function getEntity(id: number): Promise<Entity | undefined> {
  return db.entities.get(id)
}

export function createEntity(data: Entity): Promise<Entity> {
  return db.entities.add(data).then(
    (id) => {
      data.id = id
      return data
    },
    (e) => {
      console.log(e)
      throw e
    },
  )
}

export function deleteEntity(id: number): Promise<void> {
  return db.entities.delete(id)
}

export function updateEntity(data: Entity): Promise<Entity> {
  return db.entities.update(data.id, data).then(
    (_) => data,
    (e) => {
      console.log(e)
      throw e
    },
  )
}
