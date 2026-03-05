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
  import ItemDescription from '$lib/components/ui/item/item-description.svelte'
  import type { Entity } from '$lib/schemas/entity'
  import ModalButton from '../ModalButton.svelte'
  import EntityEditPage from '../../../../routes/entities/[id=integer]/edit/+page.svelte'

  const { entity }: { entity: Entity } = $props()
</script>

<Item variant="outline">
  <ItemContent>
    <ItemTitle><h1 class="text-2xl">{entity.name}</h1></ItemTitle>
    <ItemDescription>{entity.description}</ItemDescription>
  </ItemContent>
  <ItemActions>
    <ModalButton href="/entities/${entity.id}/edit" variant="outline" size="sm">
      <EditIcon /> Edit
    </ModalButton>
  </ItemActions>
</Item>

{#if page.state.loaderData}
  <EntityEditPage data={page.state.loaderData} />
{/if}
