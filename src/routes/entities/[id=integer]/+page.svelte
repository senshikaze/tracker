<script lang="ts">
  import { goto } from '$app/navigation'
  import BreadcrumbItem from '$lib/components/ui/breadcrumb/breadcrumb-item.svelte'
  import BreadcrumbLink from '$lib/components/ui/breadcrumb/breadcrumb-link.svelte'
  import BreadcrumbList from '$lib/components/ui/breadcrumb/breadcrumb-list.svelte'
  import BreadcrumbSeparator from '$lib/components/ui/breadcrumb/breadcrumb-separator.svelte'
  import Breadcrumb from '$lib/components/ui/breadcrumb/breadcrumb.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import ItemActions from '$lib/components/ui/item/item-actions.svelte'
  import ItemContent from '$lib/components/ui/item/item-content.svelte'
  import ItemHeader from '$lib/components/ui/item/item-header.svelte'
  import ItemTitle from '$lib/components/ui/item/item-title.svelte'
  import Item from '$lib/components/ui/item/item.svelte'
  import type { Entity } from '$lib/schemas/entity'
  import { toast } from 'svelte-sonner'
  import Edit from '@lucide/svelte/icons/edit'

  interface EntityProp {
    entity: Entity
  }
  const { data }: { data: EntityProp } = $props()

  const entity = data.entity

  if (!entity) {
    toast.error('Entity not found!')
    goto('/entities')
  }
</script>

<div class="flex flex-col w-full space-y-2">
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/entities">Entities</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={`/entities/${entity.id}`}>
          {entity.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
  <div class="flex flex-col">
    <Item variant="outline" class="w-full">
      <ItemContent>
        <ItemHeader>
          <ItemTitle class="text-2xl">{entity.name}</ItemTitle>
        </ItemHeader>
      </ItemContent>
      <ItemActions>
        <Button><Edit /> Edit</Button>
      </ItemActions>
    </Item>
  </div>
</div>
