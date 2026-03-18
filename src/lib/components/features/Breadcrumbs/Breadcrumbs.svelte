<script lang="ts">
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from '$lib/components/ui/breadcrumb'
  import { getBreadcrumbs } from '$lib/stores/breadcrumb.svelte'

  const breadcrumbs = $derived(getBreadcrumbs())
</script>

<Breadcrumb class="flex items-center">
  <BreadcrumbList>
    {#each breadcrumbs as breadcrumb, key}
      <BreadcrumbItem class="text-lg">
        <BreadcrumbLink href={breadcrumb.href}>
          {breadcrumb.label}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {#if key < breadcrumbs.length - 1}
        <BreadcrumbSeparator />
      {/if}
    {/each}
  </BreadcrumbList>
</Breadcrumb>
