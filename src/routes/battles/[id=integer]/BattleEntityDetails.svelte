<script lang="ts">
  import type { Entity } from '$lib/schemas/entity'

  const { entity }: { entity: Entity } = $props()
</script>

<div class="flex p-4">
  <div class="flex">
    <h1 class="text-3xl">{entity.name}</h1>
  </div>
  <div> </div>
</div>
