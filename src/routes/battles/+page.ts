import { getBattles } from "$lib/services/data"

export async function load() {
  const battles = await getBattles()

  return { battles }
}
