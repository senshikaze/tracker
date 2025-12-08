<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import { getEntity } from '$lib/services/data'
  import type { Battle } from '$lib/types/data/battle'
  import type { BattleEntity } from '$lib/types/data/battle_entity'
  import type { Entity } from '$lib/types/data/entity'
  import PlusIcon from '@lucide/svelte/icons/plus'

  interface PageProps {
    battle: Battle
    entities: BattleEntity[]
  }
  let { data }: { data: PageProps } = $props()

  let selectedEntity: Entity | undefined = $state()

  const selectEntity = async (entity: BattleEntity) =>
    (selectedEntity = await getEntity(entity.entity_id))
</script>

<div class="w-full h-full flex">
  <div class="flex flex-2 flex-col">
    <div class="grow min-h-64 overflow-y-scroll">
      {#if data.entities}{:else}
        <p>No entities in Encounter</p>
      {/if}
    </div>
    <div class="p-2 border-t-2 dark:border-gray-400 border-gray-600">
      <Button>
        <PlusIcon />
        Add
      </Button>
    </div>
  </div>
  <div
    class="flex-10 flex flex-col border-l-2 p-2 dark:border-gray-400 border-gray-600"
  >
    <Input value={data.battle.name} />
    <div class="grow flex flex-col overflow-y-scroll">
      {#if selectedEntity}
        <p>{selectedEntity.id}</p>
      {:else}
        <p
          class="my-auto text-center text-2xl text-gray-500 dark:text-gray-700"
        >
          --Select an Entity--
        </p>
      {/if}
    </div>
  </div>
</div>
