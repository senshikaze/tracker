<script lang="ts">
  let { children } = $props()
  import '../app.css'
</script>

<div
  class="w-full h-screen flex flex-col bg-gray-200 text-gray-950 dark:bg-gray-950 dark:text-white"
>
  <nav class="p-4 bg-gray-400">
    <a class="text-xl p-2 hover:bg-gray-600 rounded-md" href="/">Home</a>
    <a class="text-xl p-2 hover:bg-gray-600 rounded-md" href="/battles">
      Battles
    </a>
    <a class="text-xl p-2 hover:bg-gray-600 rounded-md" href="/entities">
      Entities
    </a>
    <a class="text-xl p-2 hover:bg-gray-600 rounded-md" href="/about">About</a>
  </nav>
  <div class="h-full! flex">
    {@render children()}
  </div>
</div>
