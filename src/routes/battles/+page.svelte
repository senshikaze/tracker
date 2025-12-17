<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import { Empty } from '$lib/components/ui/empty'
  import {
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
    Item,
  } from '$lib/components/ui/item/'
  import { deleteBattle } from '$lib/services/data.js'

  let { data } = $props()
  const { battles } = $derived(data)
</script>

<div class="flex flex-col w-full">
  <div class="flex w-full">
    <h1 class="grow text-3xl mb-4">Battles</h1>
    <span>
      <Button href="battles/add" title="Add New Battle" variant="secondary">
        Add
      </Button>
    </span>
  </div>
  <ItemGroup class="space-y-2">
    {#each battles as battle}
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{battle.name}</ItemTitle>
          <ItemDescription>{battle.description}</ItemDescription>
        </ItemContent>
        <ItemContent>
          <ItemActions>
            <Button
              href="battles/{battle.id}"
              class="mx-2"
              variant="outline"
              title="View Battle"
            >
              View
            </Button>
            <Button
              class="mx-2"
              title="Delete Battle"
              variant="destructive_outline"
              onclick={() => (battle.id ? deleteBattle(battle.id) : undefined)}
            >
              Delete
            </Button>
          </ItemActions>
        </ItemContent>
      </Item>
    {:else}
      <Empty>No Battles Found</Empty>
    {/each}
  </ItemGroup>
</div>
