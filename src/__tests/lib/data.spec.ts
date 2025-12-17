import 'fake-indexeddb'
import type { Battle } from '$lib/schemas/battle'
import { createBattle } from '$lib/services/data'
import { describe, it, expect } from 'vitest'

describe('data tests', () => {
  it('should create battle', () => {
    const battle = {
      name: 'test battle',
    } satisfies Battle

    const newBattle = createBattle(battle)

    expect(newBattle).toHaveProperty('name', battle.name)
  })
})
