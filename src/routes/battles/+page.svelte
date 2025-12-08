<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte'

  let { data } = $props()
</script>

<div class="flex flex-col w-full">
  <div class="flex w-full">
    <h1 class="grow text-3xl mb-4">Battles</h1>
    <span>
      <Button href="battles/add" title="Add New Battle" variant="secondary"
        >Add</Button
      >
    </span>
  </div>
  <div class="flex flex-col">
    <div class="flex flex-col w-full">
      {#each data.battles as battle}
        <div
          class="p-2 my-2 w-full flex flex-row bg-gray-300 dark:bg-gray-800 dark:text-gray-400"
        >
          <span class="flex-1">
            {battle.name}
          </span>
          <span class="flex-2 flex flex-row justify-end px-2">
            <Button
              href="battles/{battle.id}"
              class="mx-2"
              variant="outline"
              title="View Battle"
            >
              Go To
            </Button>
            <Button
              href="battles/{battle.id}"
              class="mx-2"
              title="Delete Battle"
              variant="destructive_outline"
            >
              Delete
            </Button>
          </span>
        </div>
      {:else}
        <p>No Battles Found</p>
      {/each}
    </div>
  </div>
</div>
