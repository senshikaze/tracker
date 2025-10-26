export interface BattleEntity {
  id?: number
  battle_id: number
  entity_id: number
  total_hp?: number
  current_hp?: number
  initiative?: number
  player_character?: boolean
}
