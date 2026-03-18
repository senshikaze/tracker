<script lang="ts">
  import { page } from '$app/state'
  import { EditIcon } from '$lib/components/Icons/lucide'
  import {
    Item,
    ItemActions,
    ItemContent,
    ItemHeader,
    ItemTitle,
  } from '$lib/components/ui/item'
  import ModalButton from '$lib/components/features/ModalButton.svelte'
  import { setBreadcrumbs } from '$lib/stores/breadcrumb.svelte'
  import EntityEditPage from './edit/+page.svelte'
  import EntityBattles from './EntityBattles.svelte'
  import EntityScores from './EntityScores.svelte'
  import type { PageProps } from './$types'

  const { data }: PageProps = $props()

  const { entity, battleEntities } = $derived(data)

  $effect(() => {
    setBreadcrumbs([
      {
        href: '/entities',
        label: 'Entities',
      },
      {
        href: `/entities/${entity.id}`,
        label: entity.name ?? `Entity-${entity.id}`,
      },
    ])
  })
</script>

<div class="flex flex-col w-full space-y-2">
  <div class="flex flex-col gap-2">
    <Item variant="outline" class="w-full">
      <ItemContent>
        <ItemHeader>
          <ItemTitle class="text-2xl">{entity.name}</ItemTitle>
        </ItemHeader>
      </ItemContent>
      <ItemActions>
        <ModalButton
          href="/entities/{entity.id}/edit"
          title="Edit Entity"
          variant="outline"
        >
          <EditIcon /> Edit
        </ModalButton>
      </ItemActions>
    </Item>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="md-colspan-1 flex flex-col">
        <EntityScores {entity} />
      </div>
      <div class="md-colspan-2"></div>
    </div>
    <div class="flex flex-col">
      <EntityBattles {battleEntities} />
    </div>
  </div>
</div>

{#if page.state.loaderData}
  <EntityEditPage data={page.state.loaderData} />
{/if}
