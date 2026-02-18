<script lang="ts">
  import ButtonGroup from '$lib/components/ui/button-group/button-group.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import type { Battle } from '$lib/schemas/battle'
  import ChevronDown from '@lucide/svelte/icons/chevron-down'
  import ChevronUp from '@lucide/svelte/icons/chevron-up'
  import Octagon from '@lucide/svelte/icons/octagon'

  const {
    battle,
    setInit,
    className,
    setStarted,
  }: {
    battle: Battle
    setInit: (init: number) => void
    className?: string
    setStarted: (started: boolean) => void
  } = $props()

  let started = $state(false)
  let currentInit = $derived(battle.initiative ?? 0)
</script>

{#if !started}
  <Button size="sm" onclick={() => ((started = true), setStarted(true))}>
    Start
  </Button>
{:else}
  <ButtonGroup orientation="horizontal">
    <Button
      size="icon-sm"
      title="Next"
      onclick={() => {
        currentInit--
        setInit(currentInit)
      }}
    >
      <ChevronDown />
    </Button>
    <Button
      size="icon-sm"
      title="Previous"
      onclick={() => {
        currentInit++
        setInit(currentInit)
      }}
    >
      <ChevronUp />
    </Button>
    <Button
      size="icon-sm"
      variant="destructive"
      title="End Battle"
      onclick={() => (started = false)}
    >
      <Octagon />
    </Button>
  </ButtonGroup>
{/if}
