<script lang="ts">
  import GripVertical from '@lucide/svelte/icons/grip-vertical'
  import HealthChanger from './HealthChanger.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import type { BattleEntityExtended } from '$lib/schemas/entity'
  import { updateEntity } from '$lib/services/data'
  import Edit from '@lucide/svelte/icons/edit'

  let {
    entity = $bindable(),
    selected,
    index,
    started,
  }: {
    entity: BattleEntityExtended
    selected: (entity: BattleEntityExtended) => void
    index: number
    started: boolean
  } = $props()
</script>

<div
  class={`flex flex-col ${(entity.current_hp ?? 1) % (entity.total_hp ?? 1) == 1 ? 'bg-red-800' : ''}`}
  role="menuitem"
  tabindex={entity.initiative ?? index}
  onclick={() => selected(entity)}
  onkeyup={() => selected(entity)}
>
  <div class="min-w-full flex">
    <Button
      class="cursor-grab self-center space-x-2"
      variant="outline"
      size="icon-sm"
      title="Change Initiative Order"
      disabled={!started}
    >
      <GripVertical />
      {entity.initiative}
    </Button>
    <div class="grow flex flex-col mx-2">
      <h1 class="text-2xl mb-2">
        <a href={`/entities/${entity.entity_id}`}>
          {entity.entity?.name}
          <Edit size={13} class="inline text-primary/70" />
        </a>
      </h1>
      <div class="flex justify-between text-secondary-foreground">
        <p>
          <span class="text-secondary-foreground/70">AC:</span>
          {entity.entity?.ac ?? '--'}
        </p>
        <p>
          <span class="text-secondary-foreground/70">Init:</span>
          {entity.initiative ?? '--'}
        </p>
      </div>
      <div class="flex justify-between text-sm text-secondary-foreground">
        <p>
          <span class="text-secondary-foreground/70">Speed:</span>
          {entity.entity?.speed ?? '--'}
        </p>
        <p title="Passive Perception">
          <span class="text-secondary-foreground/70">Pass. Perception:</span>
          {entity.entity?.skills?.find((p) => p.name == 'perception') ?? '--'}
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-end space-y-2">
      <p class="text-lg self-center">{entity.current_hp} / {entity.total_hp}</p>
      <HealthChanger
        {entity}
        changeHealth={(current) => {
          console.log(current)

          updateEntity
          console.log(entity.current_hp)
        }}
      />
    </div>
  </div>
</div>
