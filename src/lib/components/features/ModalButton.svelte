<script lang='ts'>
  import { preloadData, pushState } from "$app/navigation"
  import { Button, type Props as ButtonProps } from "$lib/components/ui/button"
  import type { Snippet } from "svelte"

  interface ModalButtonProps {
    href: string
    children: Snippet
    title?: string
  } 
  const { href, children, title = '', ...props }: ModalButtonProps & ButtonProps  = $props()

</script>

<Button
  href={href}
  onclick={async (e) => {
    e.preventDefault()

    const result = await preloadData(href)

    if (result.type === 'loaded' && result.status === 200) {
      pushState(href, { selected: result.data } as App.PageState )
    } else {}
  }}
  title={title}
  {...props}
>
{@render children()}
</Button>
