<script lang="ts">
  import { page } from "$app/state";
</script>

{#if (page.status == 404)}
<div>
  <h1 class="text-5xl">Page Not Found</h1>
  <p>Hol' up partner, that page doesn't exist! How about going <a class="underline" href="/">home</a></p>
</div>
{:else}
<div>
  <h1 class="text-5xl">{page.status} {page.message}</h1>
  <p>How about going <a class="underline" href="/">home</a></p>
</div>
{/if}