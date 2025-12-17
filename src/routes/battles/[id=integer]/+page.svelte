<script lang="ts">
  import Add from '$lib/components/features/BattleEntities/Add.svelte'
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '$lib/components/ui/breadcrumb'
  import { Button } from '$lib/components/ui/button'
  import { Dialog, DialogContent } from '$lib/components/ui/dialog'
  import { Empty, EmptyHeader, EmptyTitle } from '$lib/components/ui/empty'
  import { ItemContent, ItemGroup, Item } from '$lib/components/ui/item'
  import type { BattleEntity, Entity } from '$lib/schemas/entity'
  import { getEntity } from '$lib/services/data'
  import PlusIcon from '@lucide/svelte/icons/plus'
  import type { PageProps } from './$types'

  let { data }: PageProps = $props()

  const { battle, entities } = $derived(data)

  let selectedEntity: Entity | undefined = $state()
  let showAdd: boolean = $state(false)

  const entitySelected = async (entity: BattleEntity) =>
    await getEntity(entity.entity_id).then((e) => (selectedEntity = e))
</script>

<div class="w-full h-full flex">
  <div class="flex flex-2 flex-col">
    <div class="flex p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/battles">Battles</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{battle?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto"
        onclick={() => (showAdd = true)}
      >
        <PlusIcon />
        Add
      </Button>
    </div>
    <div class="grow min-h-64 overflow-y-scroll">
      <ItemGroup>
        {#each entities as entity}
          <Item>
            <ItemContent>{entity.entity?.name}</ItemContent>
          </Item>
        {:else}
          <Empty>
            <EmptyHeader>
              <EmptyTitle
                class="m-auto text-xl text-gray-700 dark:text-gray-600"
                >No Entities in Battle</EmptyTitle
              >
            </EmptyHeader>
          </Empty>
        {/each}
      </ItemGroup>
    </div>
  </div>
  <div class="flex-10 flex flex-col border-l p-2S">
    <div class="grow flex flex-col overflow-y-scroll">
      {#if selectedEntity}
        <p>{selectedEntity.id}</p>
      {:else}
        <Empty>
          <EmptyHeader>
            <EmptyTitle class="text-2xl text-gray-700 dark:text-gray-600">
              -- Select an Entity --
            </EmptyTitle>
          </EmptyHeader>
        </Empty>
      {/if}
    </div>
  </div>

  <Dialog bind:open={showAdd}>
    <DialogContent>
      <Add
        battle_id={battle?.id ?? 0}
        battleEntityCreated={(be) => entities.push(be)}
        cancel={() => (showAdd = false)}
      />
    </DialogContent>
  </Dialog>
</div>
