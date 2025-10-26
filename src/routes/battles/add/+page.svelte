<script lang="ts">
  import { redirect } from '@sveltejs/kit'
  import SubmitButton from '$components/forms/SubmitButton.svelte'
  import TextInput from '$components/forms/TextInput.svelte'
  import { createBattle } from '$lib/services/data'
  import type { FormError } from '$lib/types/components/forms/FormError'
  import TextArea from '$components/forms/TextArea.svelte'
  import { goto } from '$app/navigation'

  let errors: FormError = $state({ isError: false })

  async function handleSubmit(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement },
  ) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const name = data.get('name') as string
    const description = data.get('description') as string

    if (!name) {
      errors = {
        isError: true,
        message: 'There was an error.',
        fields: {
          name: {
            missing: !name,
            message: 'Name is required',
          },
        },
      }
      return
    }

    createBattle({
      name: name,
      description: description ?? '',
      started: false,
    }).then(
      (battle) => {
        goto(`/battles/${battle.id}`)
      },
      (reason) =>
        (errors = {
          isError: true,
          message: `Error creating Battle: ${reason}`,
        }),
    )
  }
</script>

<form method="post" onsubmit={handleSubmit}>
  {#if errors !== undefined && errors.isError}
    <p class="text-red-300">{errors?.message ?? ''}</p>
  {/if}
  <div class="flex flex-col md:min-w-xl">
    <TextInput
      {...{
        name: 'name',
        label: 'Title',
        error: errors,
      }}
    />
    <TextArea
      {...{
        name: 'description',
        label: 'Description',
        error: errors,
        style: 'h-48',
      }}
    />
    <SubmitButton {...{ value: 'Add', enabled: !errors.isError }} />
  </div>
</form>
