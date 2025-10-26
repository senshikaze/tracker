<script lang="ts">
  import ButtonLink from '$components/base/ButtonLink.svelte'

  let { data } = $props()
</script>

<div class="flex flex-col w-full">
  <div class="flex w-full">
    <h1 class="text-3xl mb-4">Battles</h1>
    <span>
      <ButtonLink
        {...{ text: 'Add', href: 'battles/add', title: 'Add New Battle' }}
      >
        Add
      </ButtonLink>
    </span>
  </div>
  <div class="flex flex-col">
    <div class="flex flex-col w-full">
      {#each data.battles as battle}
        <div
          class="p-2 m-2 w-full flex flex-row bg-gray-300 dark:bg-gray-800 dark:text-gray-400"
        >
          <a
            href="/battles/{battle.id}"
            class="no-underline text-xl flex-10 hover:text-gray-500"
            >{battle.name}</a
          >
          <span class="flex-2 flex flex-row">
            <ButtonLink
              {...{
                href: `battles/${battle.id}`,
                title: 'Delete Battle',
                style: 'danger',
              }}>Delete</ButtonLink
            >
          </span>
        </div>
      {:else}
        <p>No Battles Found</p>
      {/each}
    </div>
  </div>
</div>
