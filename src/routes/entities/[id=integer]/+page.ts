import { filterBattleEntities, getEntity } from '$lib/services/data'
import { error } from '@sveltejs/kit'

interface EntityProps {
  params: {
    id: string
  }
}

export async function load({ params }: EntityProps) {
  const entity = await getEntity(Number.parseInt(params.id))

  if (entity === undefined) {
    error(404, 'Entity not found')
  }

  const battleEntities = await filterBattleEntities({entity_id: entity?.id})

  return { entity, battleEntities }
}
