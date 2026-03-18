<script lang="ts">
  let { children } = $props()
  import { ModeWatcher } from 'mode-watcher'
  import '../app.css'
  import { Toaster } from '$lib/components/ui/sonner'
  import Navbar from './Navbar.svelte'
</script>

<ModeWatcher />
<div class="w-full h-screen flex flex-col">
  <Navbar />
  <div class="h-full! flex p-2">
    {@render children()}
  </div>
  <Toaster />
</div>
