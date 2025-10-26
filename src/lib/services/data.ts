import { type Battle } from '$lib/types/components/data/battle'
import type { BattleEntity } from '$lib/types/components/data/battle_entity'
import type { Entity } from '$lib/types/components/data/entity'
import { create, get, list, update } from './database'

/** Battles */
export function getBattles(): Promise<Battle[]> {
  return list('battles')
}

export function getBattle(id: number): Promise<Battle> {
  return get('battles', id)
}

export function createBattle(data: Battle): Promise<Battle> {
  return create('battles', data)
}

export function updateBattle(data: Battle): Promise<Battle> {
  return update('battles', data)
}

/** Battle Entities */
export function getBattleEntities(battle_id: number): Promise<BattleEntity[]> {
  return list('battle-entities', { index: 'battle_id', value: battle_id })
}

export function createBattleEntity(data: BattleEntity): Promise<BattleEntity> {
  if (data.battle_id === undefined || data.entity_id === undefined) {
    return Promise.reject('Must have both battle and entity ids')
  }
  return create('battle-entities', data)
}

/** Entities */
export function getEntities(): Promise<Entity[]> {
  return list('entities')
}

export function getEntity(id: number): Promise<Entity> {
  return get('entities', id)
}

export function createEntity(data: Entity): Promise<Entity> {
  return create('entities', data)
}

export function updateEntity(data: Entity): Promise<Entity> {
  return update('entities', data)
}
