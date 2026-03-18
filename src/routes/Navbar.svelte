<script lang="ts">
  import logo from '$lib/assets/images/tracker-logo.png'
  import Breadcrumbs from '$lib/components/features/Breadcrumbs/Breadcrumbs.svelte'
</script>

<nav>
  <div class="flex justify-between p-2">
    <div class="flex gap-8">
      <a href="/battles">
        <img
          src={logo}
          alt="logo"
          title="Tracker Battles"
          class="w-24 aspect-auto dark:invert"
        />
      </a>
      <Breadcrumbs />
    </div>
    <div class="flex"></div>
  </div>
</nav>
