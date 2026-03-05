<script lang="ts">
  import { page } from '$app/state'
  import ModalButton from '$lib/components/features/ModalButton.svelte'
  import { Button } from '$lib/components/ui/button'
  import { Empty, EmptyContent, EmptyHeader } from '$lib/components/ui/empty'
  import {
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
    Item,
  } from '$lib/components/ui/item/'
  import { deleteBattle } from '$lib/services/data.js'
  import AddPage from './add/+page.svelte'
  import { toast } from 'svelte-sonner'

  let { data } = $props()
  const { battles } = $derived(data)
</script>

<div class="flex flex-col w-full">
  <div class="flex w-full">
    <h1 class="grow text-3xl mb-4">Battles</h1>
    <span>
      <ModalButton
        href="battles/add"
        title="Add New Battle"
        variant="secondary"
      >
        Add
      </ModalButton>
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
              onclick={() => {
                if (battle.id) {
                  deleteBattle(battle.id)
                  toast('Battle Deleted')
                }
              }}
            >
              Delete
            </Button>
          </ItemActions>
        </ItemContent>
      </Item>
    {:else}
      <Empty>
        <EmptyHeader>No Battles Found</EmptyHeader>
        <EmptyContent>
          <ModalButton href="battles/add">Add New Battle</ModalButton>
        </EmptyContent>
      </Empty>
    {/each}
  </ItemGroup>
</div>

{#if page.state.loaderData}
  <AddPage />
{/if}
