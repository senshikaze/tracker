<script lang="ts">
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '$lib/components/ui/card'
  import { Empty, EmptyTitle } from '$lib/components/ui/empty'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from '$lib/components/ui/table'
  import { modifier } from '$lib/schemas/d20/stats'
  import type { Entity } from '$lib/schemas/entity'

  const { entity }: { entity: Entity } = $props()
</script>

<Card>
  <CardHeader>
    <CardTitle>Ability Scores</CardTitle>
  </CardHeader>
  <CardContent>
    <Table>
      <TableBody>
        {#each entity.scores as score}
          <TableRow>
            <TableHead>{score.type}</TableHead>
            <TableCell>{score.score}</TableCell>
            <TableCell>{modifier(score)}</TableCell>
          </TableRow>
        {:else}
          <Empty>
            <EmptyTitle class="text-primary/50">
              -- No Ability Scores set! --
            </EmptyTitle>
          </Empty>
        {/each}
      </TableBody>
    </Table>
  </CardContent>
</Card>
