import { getBattle } from "$lib/services/data";
import type { PageLoad } from "../../$types";

export const load: PageLoad = async ({ params }) => {
  const battle = await getBattle(Number.parseInt(params.id))
  return { battle }
}