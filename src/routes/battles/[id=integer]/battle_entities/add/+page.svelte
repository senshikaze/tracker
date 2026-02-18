<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/state"
  import { Button } from "$lib/components/ui/button"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import { FormButton, FormControl, FormField, FormFieldErrors, FormLabel } from "$lib/components/ui/form"
  import { Input } from "$lib/components/ui/input"
  import { Label } from "$lib/components/ui/label"
  import { Textarea } from "$lib/components/ui/textarea"
  import { battleEntityAddSchema } from "$lib/schemas/entity"
  import { createBattleEntity, createEntity } from "$lib/services/data"
  import { toast } from "svelte-sonner"
  import { defaults, superForm } from "sveltekit-superforms"
  import { Dialog, DialogContent } from '$lib/components/ui/dialog'
  import { zod4, zod4Client } from "sveltekit-superforms/adapters"

  const { data } = $props()

  let battle = $derived(data.battle)

  // create form for both entity and battle entity
  const form = superForm(defaults(zod4(battleEntityAddSchema)), {
    SPA: true,
    validators: zod4Client(battleEntityAddSchema),
    onUpdate({ form }) {
      if (form.valid) {
        // create entity
        const entity = createEntity({
          name: form.data.name,
          description: form.data.description ?? '',
        }).then(
          (entity) => {
            if (entity.id && battle?.id)
              // create battle entity
              createBattleEntity({
                battle_id: battle.id,
                entity_id: entity.id,
                total_hp: form.data.total_hp,
                current_hp: form.data.total_hp,
                player_character: form.data.player_character,
              }).then(
                (battleEntity) => {
                  toast('Battle Entity Created!')
                  goto(`/battles/${battle.id}`)
                },
                (reason) =>
                  // TODO update errors in form
                  toast.error(`Could not create Battle Entity!\n${reason}`),
              )
          },
          (reason) => {
            toast.error(`Could not create Entity!\n${reason}`)
          },
        )
      }
    },
  })

  const { form: createFormData, enhance } = form
</script>

<Dialog open onOpenChange={() => goto(`/battles/${battle?.id ?? ''}`)}>
  <DialogContent>
  <!-- show search menu for existing entities-->
  <form method="post" use:enhance class="space-y-6">
    <FormField {form} name="name">
      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input bind:value={$createFormData.name} />
      </FormControl>
      <FormFieldErrors />
    </FormField>
    <FormField {form} name="description">
      <FormControl>
        <FormLabel>Description:</FormLabel>
        <Textarea bind:value={$createFormData.description} />
      </FormControl>
      <FormFieldErrors />
    </FormField>
    <FormField {form} name="total_hp">
      <FormControl>
        <FormLabel>Total HP:</FormLabel>
        <Input type="number" min="0" bind:value={$createFormData.total_hp} />
      </FormControl>
      <FormFieldErrors />
    </FormField>
    <FormField {form} name="initiative">
      <FormControl>
        <FormLabel>Initiative:</FormLabel>
        <Input type="number" min="0" bind:value={$createFormData.initiative} />
      </FormControl>
      <FormFieldErrors />
    </FormField>
    <FormField {form} name="player_character">
      <FormControl>
        <div class="flex space-x-2 flex-nowrap">
          <Checkbox
            onCheckedChange={(v) => ($createFormData.player_character = v)}
          />
          <Label class="inline">Is this a Player Character?</Label>
        </div>
      </FormControl>
      <FormFieldErrors />
    </FormField>
    <div class="flex space-x-2 justify-end">
      <FormButton>Create and Add Entity</FormButton>
      <Button
        variant="outline"
        onclick={() => goto(`/battles/${battle?.id ?? ''}`)}
      >
        Cancel
      </Button>
    </div>
  </form>
  </DialogContent>
</Dialog>
