<script lang="ts">
  import Button from '$components/base/Button.svelte'
  import TextInput from '$components/forms/TextInput.svelte'
  import AddIcon from '$components/icons/AddIcon.svelte'
  import { getEntity } from '$lib/services/data'
  import type { Battle } from '$lib/types/components/data/battle'
  import type { BattleEntity } from '$lib/types/components/data/battle_entity'
  import type { Entity } from '$lib/types/components/data/entity'

  interface PageProps {
    battle: Battle
    entities: BattleEntity[]
  }
  let { data }: { data: PageProps } = $props()

  let selectedEntity: Entity | undefined = $state()

  const selectEntity = async (entity: BattleEntity) =>
    (selectedEntity = await getEntity(entity.entity_id))
</script>

<div class="w-full h-full flex dark:text-gray-800 dark:bg-gray-500">
  <div class="flex flex-2 flex-col">
    <div class="grow min-h-64 overflow-y-scroll">
      {#if data.entities}{:else}
        <p>No entities in Encounter</p>
      {/if}
    </div>
    <div class="p-2 border-t-2 dark:border-gray-400 border-gray-600">
      <Button>
        {#snippet startIcon()}
          <AddIcon />
        {/snippet}
        Add
      </Button>
    </div>
  </div>
  <div
    class="flex-10 flex flex-col border-l-2 p-2 dark:border-gray-400 border-gray-600"
  >
    <TextInput name="name" value={data.battle.name} sx="w-full" />
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
