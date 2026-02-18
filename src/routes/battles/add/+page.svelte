<script lang="ts">
  import { createBattle } from '$lib/services/data'
  import { goto } from '$app/navigation'
  import {FormField, FormFieldErrors, FormButton, FormLabel, FormControl} from '$lib/components/ui/form'
  import { defaults, superForm } from 'sveltekit-superforms'
  import { zod4, zod4Client } from 'sveltekit-superforms/adapters'
  import { battleAddSchema } from '$lib/schemas/battle'
  import { Textarea } from '$lib/components/ui/textarea'
  import { Dialog, DialogContent } from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Button } from '$lib/components/ui/button'

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
            console.log(`oh no: ${reason}`),
        )
      }
    },
  })

  const { form: formData, enhance, allErrors } = form
</script>

<Dialog open onOpenChange={() => goto('/battles')}>
  <DialogContent>
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
          <Textarea class='h-32' bind:value={$formData.description} />
        </FormControl>
        <FormFieldErrors />
      </FormField>
      <div class='flex justify-end space-x-2'>
      <FormButton size='sm' disabled={Boolean($allErrors.length)}>Add Battle</FormButton>
      <Button size='sm' variant='outline' onclick={() => goto('/battles')}>Cancel</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
