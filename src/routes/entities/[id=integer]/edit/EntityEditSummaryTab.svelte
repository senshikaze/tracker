<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox'
  import { FormControl, FormField, FormLabel } from '$lib/components/ui/form'
  import { Input } from '$lib/components/ui/input'
  import { Separator } from '$lib/components/ui/separator'
  import { Textarea } from '$lib/components/ui/textarea'
  import type { Entity } from '$lib/schemas/entity'
  import type { SuperForm } from 'sveltekit-superforms/client'

  interface EditSummaryProps {
    entity: Entity
    form: SuperForm<Entity>
    setPlayerCharacter: (pc: boolean) => void
  }
  let { entity, form, setPlayerCharacter }: EditSummaryProps = $props()

  const { form: formData } = $derived(form)
</script>

<FormField {form} name="name">
  <FormControl>
    <FormLabel for="name">Name</FormLabel>
    <Input id="name" bind:value={$formData.name} defaultValue={entity.name} />
  </FormControl>
</FormField>
<FormField
  {form}
  name="player_character"
  class="my-4 flex flex-row justify-between"
>
  <FormControl>
    <FormLabel for="player_character">Player Character?</FormLabel>
    <Checkbox
      id="player_character"
      checked={entity.player_character ?? false}
      onCheckedChange={(checked) => {
        setPlayerCharacter(checked)
        $formData.player_character = checked
      }}
    />
  </FormControl>
</FormField>
<FormField {form} name="description">
  <FormControl>
    <FormLabel for="description">Description</FormLabel>
    <Textarea
      id="description"
      bind:value={$formData.description}
      defaultValue={entity.description}
    />
  </FormControl>
</FormField>
