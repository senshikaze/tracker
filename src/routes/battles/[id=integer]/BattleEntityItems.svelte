<script lang="ts">
  import { Empty, EmptyHeader, EmptyTitle } from '$lib/components/ui/empty'
  import { ItemContent, ItemGroup } from '$lib/components/ui/item'
  import Item from '$lib/components/ui/item/item.svelte'
  import type { BattleEntityExtended } from '$lib/schemas/entity'
  import BattleEntityItem from './BattleEntityItem.svelte'

  let {
    entities = $bindable(),
    selected,
    started,
    className,
  }: {
    entities: BattleEntityExtended[]
    selected: (entity: BattleEntityExtended) => void
    started: boolean
    className: string
  } = $props()
</script>

<ItemGroup class={`overflow-y-auto ${className}`}>
  {#each entities as entity, index}
    <Item>
      <ItemContent>
        <BattleEntityItem
          bind:entity={entities[index]}
          selected={(entity) => selected(entity)}
          {index}
          {started}
        />
      </ItemContent>
    </Item>
  {:else}
    <Empty>
      <EmptyHeader>
        <EmptyTitle class="m-auto text-xl text-gray-700 dark:text-gray-600">
          No Entities in Battle
        </EmptyTitle>
      </EmptyHeader>
    </Empty>
  {/each}
</ItemGroup>
