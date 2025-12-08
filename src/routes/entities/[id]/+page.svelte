<script lang="ts">
  import type { Entity } from '$lib/types/data/entity'

  interface EntityProp {
    entity: Entity
  }
  let { data }: { data: EntityProp } = $props()
</script>

<div>
  {data.entity.name}
</div>
