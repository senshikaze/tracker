<script lang="ts">
  import { refreshAll } from '$app/navigation'
  import Button from '$lib/components/ui/button/button.svelte'
  import Empty from '$lib/components/ui/empty/empty.svelte'
  import ItemActions from '$lib/components/ui/item/item-actions.svelte'
  import ItemContent from '$lib/components/ui/item/item-content.svelte'
  import ItemDescription from '$lib/components/ui/item/item-description.svelte'
  import ItemGroup from '$lib/components/ui/item/item-group.svelte'
  import ItemTitle from '$lib/components/ui/item/item-title.svelte'
  import Item from '$lib/components/ui/item/item.svelte'
  import type { Entity } from '$lib/schemas/entity'
  import { deleteEntity } from '$lib/services/data'

  interface EntitiesProps {
    entities: Entity[]
  }
  let { data }: { data: EntitiesProps } = $props()

  const deleteClicked = (id?: number) => {
    if (id) {
      deleteEntity(id)
      refreshAll()
    }
  }
</script>

<div class="flex flex-col w-full">
  <div class="flex w-full mb-4">
    <h1 class="text-3xl mb-4 grow">Entities</h1>
    <span>
      <Button href="entities/add" title="Add Entity">Add</Button>
    </span>
  </div>
  <ItemGroup>
    {#each data.entities as entity}
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{entity.name}</ItemTitle>
          <ItemDescription>{entity.description}</ItemDescription>
        </ItemContent>
        <ItemContent>
          <ItemActions>
            <Button
              href="entities/{entity.id}"
              class="mx-2"
              variant="outline"
              title="View Entity"
            >
              View
            </Button>
            <Button
              onclick={() => deleteClicked(entity.id)}
              class="mx-2 cursor-pointer"
              title="Delete Entity"
              variant="destructive_outline"
            >
              Delete
            </Button>
          </ItemActions>
        </ItemContent>
      </Item>
    {:else}
      <Empty>No Entities Found</Empty>
    {/each}
  </ItemGroup>
</div>
