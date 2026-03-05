<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '$lib/components/ui/breadcrumb'
  import { Empty, EmptyHeader, EmptyTitle } from '$lib/components/ui/empty'
  import type { Entity } from '$lib/schemas/entity'
  import PlusIcon from '@lucide/svelte/icons/plus'
  import type { PageProps } from './$types'
  import BattleEntityItems from './BattleEntityItems.svelte'
  import BattleEntityDetails from './BattleEntityDetails.svelte'
  import BattleInitiative from './BattleInitiative.svelte'
  import BattleEntitiesAddPage from './battle_entities/add/+page.svelte'
  import { page } from '$app/state'
  import ModalButton from '$lib/components/features/ModalButton.svelte'

  const { data }: PageProps = $props()

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
      entities={entities ?? []}
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
      <ModalButton
        href={`./${battle.id}/battle_entities/add`}
        variant="outline"
        size="sm"
      >
        <PlusIcon />
        Add
      </ModalButton>
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
</div>

{#if page.state.loaderData}
  <BattleEntitiesAddPage data={page.state.loaderData} />
{/if}
