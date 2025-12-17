<script lang="ts">
  let { children } = $props()
  import { ModeWatcher } from 'mode-watcher'
  import '../app.css'
  import { Toaster } from '$lib/components/ui/sonner'
</script>

<ModeWatcher />
<div class="w-full h-screen flex flex-col">
  <div class="h-full! flex p-4">
    {@render children()}
  </div>
  <Toaster />
</div>
