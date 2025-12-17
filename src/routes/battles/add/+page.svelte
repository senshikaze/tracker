<script lang="ts">
  import { createBattle } from '$lib/services/data'
  import { goto } from '$app/navigation'
  import FormField from '$lib/components/ui/form/form-field.svelte'
  import { FormControl } from '$lib/components/ui/form'
  import FormLabel from '$lib/components/ui/form/form-label.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import { defaults, superForm } from 'sveltekit-superforms'
  import { zod4, zod4Client } from 'sveltekit-superforms/adapters'
  import { battleAddSchema } from '$lib/schemas/battle'
  import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte'
  import FormButton from '$lib/components/ui/form/form-button.svelte'
  import Textarea from '$lib/components/ui/textarea/textarea.svelte'

  const form = superForm(defaults(zod4(battleAddSchema)), {
    SPA: true,
    validators: zod4Client(battleAddSchema),
    onUpdate({ form }) {
      if (form.valid) {
        createBattle({
          name: form.data.name,
          description: form.data.description ?? '',
          started: false,
        }).then(
          (battle) => {
            goto(`/battles/${battle.id}`)
          },
          (reason) =>
            // TODO update errors
            console.log('oh no'),
        )
      }
    },
  })

  const { form: formData, enhance } = form
</script>

<div class="w-1/3 mx-auto">
  <form method="post" use:enhance>
    <FormField {form} name="name">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input bind:value={$formData.name} />
      </FormControl>
      <FormFieldErrors />
    </FormField>
    <FormField {form} name="description">
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea bind:value={$formData.description} />
      </FormControl>
      <FormFieldErrors />
    </FormField>
    <FormButton>Add Battle</FormButton>
  </form>
</div>
