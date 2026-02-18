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
  import type { BattleEntity, Entity } from '$lib/schemas/entity'
  import { getEntity } from '$lib/services/data'
  import PlusIcon from '@lucide/svelte/icons/plus'
  import type { PageProps } from './$types'
  import BattleEntityItems from './BattleEntityItems.svelte'
  import BattleEntityDetails from './BattleEntityDetails.svelte'
  import BattleInitiative from './BattleInitiative.svelte'

  let { data }: PageProps = $props()

  let { battle, entities } = $derived(data)

  let selectedEntity: Entity | undefined = $state()
  let showAdd: boolean = $state(false)
  let started: boolean = $state(false)
</script>

<div class="w-full min-h-full flex">
  <div class="flex flex-2 flex-col min-w-[25%]">
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
    </div>
    <BattleEntityItems
      bind:entities
      selected={(entity) => (selectedEntity = entity.entity)}
      className="grow"
      started
    />
    <div class="flex shrink justify-between pt-2 mx-2">
      <BattleInitiative
        {battle}
        setInit={(newInit) => (battle.initiative = newInit)}
        setStarted={(start) => (started = start)}
      />
      <Button variant="outline" size="sm" onclick={() => (showAdd = true)}>
        <PlusIcon />
        Add
      </Button>
    </div>
  </div>
  <div class="flex-10 flex flex-col border-l p-2S">
    <div class="grow flex flex-col overflow-y-scroll">
      {#if selectedEntity}
        <BattleEntityDetails entity={selectedEntity} />
      {:else}
        <Empty>
          <EmptyHeader>
            <EmptyTitle class="text-2xl text-primary/50">
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
