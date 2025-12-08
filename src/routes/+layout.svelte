<script lang="ts">
  import NavigationMenuItem from '$lib/components/ui/navigation-menu/navigation-menu-item.svelte'
  import NavigationMenuLink from '$lib/components/ui/navigation-menu/navigation-menu-link.svelte'
  import NavigationMenuList from '$lib/components/ui/navigation-menu/navigation-menu-list.svelte'
  let { children } = $props()
  import NavigationMenu from '$lib/components/ui/navigation-menu/navigation-menu.svelte'
  import { ModeWatcher } from 'mode-watcher'
  import '../app.css'
</script>

<ModeWatcher />
<div class="w-full h-screen flex flex-col">
  <NavigationMenu class="min-w-full border-b-2 ">
    <NavigationMenuList>
      <NavigationMenuItem class="p-2 text-2xl cursor-pointer">
        <NavigationMenuLink>
          <a href="/">Home</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem class="p-2 text-2xl cursor-pointer">
        <NavigationMenuLink>
          <a href="/battles">Battles</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem class="p-2 text-2xl cursor-pointer">
        <NavigationMenuLink>
          <a href="/entities">Entities</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  <div class="h-full! flex p-4">
    {@render children()}
  </div>
</div>
