import { getEntity } from '$lib/services/data'
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
  return { entity }
}
