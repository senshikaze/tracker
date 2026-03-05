<script lang="ts">
  import { ChevronDownIcon, ChevronUpIcon } from '$lib/components/Icons/lucide'
  import ButtonGroup from '$lib/components/ui/button-group/button-group.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import type { BattleEntityExtended } from '$lib/schemas/entity'

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
    const current_health = entity.current_hp ?? 0
    const total_health = entity.total_hp ?? 0
    let newHealth = current_health ?? 0
    if (operation == 'add') {
      newHealth = current_health + healthChangeValue
      if (newHealth > total_health) {
        newHealth = total_health
      }
    }

    if (operation == 'sub') {
      newHealth = current_health - healthChangeValue
      if (newHealth < 0 && !entity.player_character) {
        newHealth = 0
      }
    }
    changeHealth(newHealth)
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
    <ChevronUpIcon />
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
    <ChevronDownIcon />
  </Button>
</ButtonGroup>
