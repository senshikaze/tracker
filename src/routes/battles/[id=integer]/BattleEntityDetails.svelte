<script lang="ts">
  import ShowEntity from '$lib/components/features/Entities/ShowEntity.svelte'
  import type { Entity } from '$lib/schemas/entity'

  const { entity }: { entity: Entity } = $props()
</script>

<ShowEntity {entity} />
