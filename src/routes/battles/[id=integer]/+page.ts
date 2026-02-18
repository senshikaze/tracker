import { getBattle, getBattleEntities } from '$lib/services/data'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  const [battle, entities] = await Promise.all([
    getBattle(Number.parseInt(params.id)),
    getBattleEntities(Number.parseInt(params.id)),
  ])

  if (battle === undefined) {
    error(404, 'Battle not found')
  }

  return { battle, entities }
}
