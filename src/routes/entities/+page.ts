import { getEntities } from '$lib/services/data'

export async function load() {
  const entities = await getEntities()

  return { entities }
}
