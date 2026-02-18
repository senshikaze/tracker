<script lang="ts">
  import ButtonGroup from '$lib/components/ui/button-group/button-group.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import type { BattleEntityExtended } from '$lib/schemas/entity'
  import ChevronDown from '@lucide/svelte/icons/chevron-down'
  import ChevronUp from '@lucide/svelte/icons/chevron-up'

  let {
    entity,
    changeHealth,
  }: {
    entity: BattleEntityExtended
    changeHealth: (currentHealth: number) => void
  } = $props()

  let healthChangeValue = $state(1)

  const changeCurrentHealth = (
    entity: BattleEntityExtended,
    operation: 'add' | 'sub',
  ) => {
    let newHealth = entity.current_hp ?? 0
    if (operation == 'add') {
      if (
        (entity.current_hp ?? 0) + healthChangeValue >
        (entity.total_hp ?? 0)
      ) {
        newHealth = entity.total_hp ?? 0
      } else {
        newHealth = (entity.current_hp ?? 0) + healthChangeValue
      }
    }

    if (operation == 'sub') {
      if ((entity.current_hp ?? 0) - healthChangeValue < 0) {
        if (entity.player_character) {
          newHealth = (entity.current_hp ?? 0) - healthChangeValue
        } else {
          newHealth = 0
        }
      } else {
        newHealth = entity.current_hp ?? 0 - healthChangeValue
      }
    }
    changeHealth(newHealth)
    console.log(newHealth)
  }
</script>

<ButtonGroup>
  <Button
    class="bg-green-600 dark:bg-green-800 hover:bg-green-700! cursor-pointer"
    variant="outline"
    size="icon"
    title="Increase Health"
    onclick={() => changeCurrentHealth(entity, 'add')}
  >
    <ChevronUp />
  </Button>
  <Input
    class="w-11 text-sm p-2"
    bind:value={healthChangeValue}
    max={9999}
    onchange={() => {
      if (healthChangeValue > 999) {
        healthChangeValue = 999
      }
      if (healthChangeValue < 1) {
        healthChangeValue = 1
      }
      if (Number.isNaN(healthChangeValue)) {
        healthChangeValue = 1
      }
    }}
  />
  <Button
    class="bg-red-600 dark:bg-red-800 hover:bg-red-700! cursor-pointer"
    variant="outline"
    size="icon"
    title="Decrease Health"
    onclick={() => changeCurrentHealth(entity, 'sub')}
  >
    <ChevronDown />
  </Button>
</ButtonGroup>
