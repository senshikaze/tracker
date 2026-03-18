<script lang="ts">
  import { Empty, EmptyHeader, EmptyTitle } from '$lib/components/ui/empty'
  import { PlusIcon } from '$lib/components/Icons/lucide'
  import ModalButton from '$lib/components/features/ModalButton.svelte'
  import { setBreadcrumbs } from '$lib/stores/breadcrumb.svelte'
  import BattleEntityItems from './BattleEntityItems.svelte'
  import BattleEntityDetails from './BattleEntityDetails.svelte'
  import BattleInitiative from './BattleInitiative.svelte'
  import BattleEntitiesAddPage from './battle_entities/add/+page.svelte'
  import { page } from '$app/state'
  import type { Entity } from '$lib/schemas/entity'
  import type { PageProps } from './$types'

  const { data }: PageProps = $props()

  let { battle, entities } = $derived(data)

  let selectedEntity: Entity | undefined = $state()
  let showAdd: boolean = $state(false)
  let started: boolean = $state(false)

  $effect(() => {
    setBreadcrumbs([
      {
        href: '/battles',
        label: 'Battles',
      },
      {
        href: `/battles/${battle.id}`,
        label: battle.name ?? `Battle-${battle.id}`,
      },
    ])
  })
</script>

<div class="w-full min-h-full flex">
  <div class="flex flex-2 flex-col min-w-[25%]">
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
  <div class="flex-10 flex flex-col border-l p-2">
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
