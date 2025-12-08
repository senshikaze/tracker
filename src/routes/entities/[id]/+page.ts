import { getEntity } from '$lib/services/data'

interface EntityProps {
  params: {
    id: string
  }
}

export async function load({ params }: EntityProps) {
  const entity = await getEntity(Number.parseInt(params.id))

  return { entity }
}
