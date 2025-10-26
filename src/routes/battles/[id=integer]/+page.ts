import { getBattle, getBattleEntities } from '$lib/services/data'

// fuck you vs code
interface BattleProps {
  params: {
    id: string
  }
}

export async function load({ params }: BattleProps) {
  const [battle, entities] = await Promise.all([
    getBattle(Number.parseInt(params.id)),
    getBattleEntities(Number.parseInt(params.id)),
  ])
  return { battle, entities }
}
