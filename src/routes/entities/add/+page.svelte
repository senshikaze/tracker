<script lang="ts">
  import { goto } from '$app/navigation'
  import { FormControl } from '$lib/components/ui/form'
  import FormButton from '$lib/components/ui/form/form-button.svelte'
  import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte'
  import FormField from '$lib/components/ui/form/form-field.svelte'
  import FormLabel from '$lib/components/ui/form/form-label.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import Textarea from '$lib/components/ui/textarea/textarea.svelte'
  import { entityAddSchema } from '$lib/schemas/entity'
  import { createEntity } from '$lib/services/data'
  import type { FormError } from '$lib/types/components/forms/FormError'
  import { defaults, superForm } from 'sveltekit-superforms'
  import { zod4, zod4Client } from 'sveltekit-superforms/adapters'

  const form = superForm(defaults(zod4(entityAddSchema)), {
    SPA: true,
    validators: zod4Client(entityAddSchema),
    onUpdate({ form }) {
      if (form.valid) {
        createEntity({
          name: form.data.name ?? '',
          description: form.data.description ?? '',
        }).then(
          (entity) => goto(`/entities/${entity}`),
          (response) =>
            // TODO add to errors
            console.log('uh oh'),
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
    <FormButton>Create Entity</FormButton>
  </form>
</div>
