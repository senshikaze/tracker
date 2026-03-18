<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card'
  import { Empty, EmptyTitle } from '$lib/components/ui/empty'
  import {
    Item,
    ItemActions,
    ItemContent,
    ItemTitle,
  } from '$lib/components/ui/item'
  import type { BattleEntityExtended } from '$lib/schemas/entity'

  const { battleEntities }: { battleEntities: BattleEntityExtended[] } =
    $props()
</script>

<Card>
  <CardHeader>
    <CardTitle>Battles</CardTitle>
  </CardHeader>
  <CardContent>
    {#each battleEntities as be}
      <Item>
        <ItemContent>
          <ItemTitle class="text-2xl">{be.battle?.name ?? '--'}</ItemTitle>
        </ItemContent>
        <ItemActions>
          {#if be.battle?.id}
            <Button href="/battles/{be.battle.id}">View</Button>
          {/if}
        </ItemActions>
      </Item>
    {:else}
      <Empty>
        <EmptyTitle class="text-primary/50">
          -- Not a Member of any Battles --
        </EmptyTitle>
      </Empty>
    {/each}
  </CardContent>
</Card>
