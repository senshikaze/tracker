<script lang="ts">
  import { goto } from '$app/navigation'
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogHeader,
    DialogFooter,
  } from '$lib/components/ui/dialog'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '$lib/components/ui/tabs'
  import { FormControl, FormField, FormLabel } from '$lib/components/ui/form'
  import { Input } from '$lib/components/ui/input'
  import { Separator } from '$lib/components/ui/separator'
  import { Textarea } from '$lib/components/ui/textarea'
  import { entitySchema, type Entity } from '$lib/schemas/entity'
  import { updateEntity } from '$lib/services/data'
  import { toast } from 'svelte-sonner'
  import { defaults, superForm } from 'sveltekit-superforms'
  import { zod4, zod4Client } from 'sveltekit-superforms/adapters'
  import EntityEditSummaryTab from './EntityEditSummaryTab.svelte'
  import { Button } from '$lib/components/ui/button'

  let { data }: { data: { entity: Entity } } = $props()

  let { entity } = $derived(data)

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

  const { enhance } = updateForm

  let player_character = $derived(entity.player_character ?? false)
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
      <DialogHeader>
        <DialogTitle>Edit {entity.name ?? 'Entity'}</DialogTitle>
      </DialogHeader>
      <fieldset>
        <Tabs value="summary">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            {#if player_character}
              <TabsTrigger value="details">Character Details</TabsTrigger>
            {/if}
            <TabsTrigger value="scores">Ability Scores</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
          </TabsList>
          <TabsContent value="summary">
            <EntityEditSummaryTab
              {entity}
              form={updateForm}
              setPlayerCharacter={(pc) => (player_character = pc)}
            />
          </TabsContent>
        </Tabs>
      </fieldset>
      <DialogFooter>
        <Button variant="default">Next</Button>
        <Separator class="mx-2" orientation="vertical" />
        <Button variant="secondary" type="submit">Save</Button>
        <Button
          variant="outline"
          onclick={() => {
            open = false
            goto(`/entities/${entity.id}`)
          }}
        >
          Cancel
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
