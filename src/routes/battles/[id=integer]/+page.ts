import { getBattle, getBattleEntities } from '$lib/services/data'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  const [battle, entities] = await Promise.all([
    getBattle(Number.parseInt(params.id)),
    getBattleEntities(Number.parseInt(params.id)),
  ])
  return { battle, entities }
}
