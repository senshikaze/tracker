<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte'
  import type { Entity } from '$lib/types/data/entity'

  interface EntitiesProps {
    entities: Entity[]
  }
  let { data }: { data: EntitiesProps } = $props()
</script>

<div class="flex flex-col w-full">
  <div class="flex w-full mb-4">
    <h1 class="text-3xl mb-4 grow">Entities</h1>
    <span>
      <Button href="entities/add" title="Add Entity">Add</Button>
    </span>
  </div>
  <div class="flex flx-col">
    {#each data.entities as entity}
      <div
        class="p-2 m-2 w-full flex flex-row bg-gray-300 dark:bg-gray-800 dark:text-gray-400"
      >
        {entity.name}
      </div>
    {:else}
      <p>No Entities Found</p>
    {/each}
  </div>
</div>
