<script lang="ts">
  import { goto } from '$app/navigation'
  import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte'
  import Dialog from '$lib/components/ui/dialog/dialog.svelte'
  import { FormControl } from '$lib/components/ui/form'
  import FormField from '$lib/components/ui/form/form-field.svelte'
  import FormFieldset from '$lib/components/ui/form/form-fieldset.svelte'
  import FormLabel from '$lib/components/ui/form/form-label.svelte'
  import FormLegend from '$lib/components/ui/form/form-legend.svelte'
  import Input from '$lib/components/ui/input/input.svelte'
  import Separator from '$lib/components/ui/separator/separator.svelte'
  import { Textarea } from '$lib/components/ui/textarea'
  import {
    entityAddSchema,
    entitySchema,
    type Entity,
  } from '$lib/schemas/entity'
  import { updateEntity } from '$lib/services/data'
  import { toast } from 'svelte-sonner'
  import { defaults, superForm } from 'sveltekit-superforms'
  import { zod4, zod4Client } from 'sveltekit-superforms/adapters'

  let { data }: { data: { entiy: Entity } } = $props()

  let entity = $derived(data.entiy)

  let open = $state(true)

  const updateForm = superForm(defaults(zod4(entitySchema)), {
    SPA: true,
    validators: zod4Client(entitySchema),
    onUpdate({ form }) {
      if (form.valid) {
        const entity = form.data
        updateEntity(entity).then(
          (entity) => {
            toast('Updated!')
            goto(`/entities/${entity.id}`)
          },
          (error) => toast.error(`Error: ${error}`),
        )
      }
    },
  })

  const { form: formData, enhance } = updateForm
</script>

<Dialog
  {open}
  onOpenChange={(current) => {
    open = current
    if (!current) goto(`/entities/${entity.id}`)
  }}
>
  <DialogContent>
    <form method="POST" use:enhance class="space-y-6">
      <fieldset>
        <legend>Entity Details</legend>
        <FormField form={updateForm} name="name">
          <FormControl>
            <FormLabel for="name">Name</FormLabel>
            <Input id="name" bind:value={$formData.name} />
          </FormControl>
        </FormField>
        <Separator />
        <FormField form={updateForm} name="description">
          <FormLabel for="description">Description</FormLabel>
          <Textarea id="description" bind:value={$formData.description} />
        </FormField>
      </fieldset>
    </form>
  </DialogContent>
</Dialog>
