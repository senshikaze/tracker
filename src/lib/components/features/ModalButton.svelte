<script lang="ts" generics="T">
  import { preloadData, pushState } from '$app/navigation'
  import { Button, type Props as ButtonProps } from '$lib/components/ui/button'
  import type { Snippet } from 'svelte'

  interface ModalButtonProps {
    href: string
    children: Snippet
    title?: string
  }
  const {
    href,
    children,
    title = '',
    ...props
  }: ModalButtonProps & ButtonProps = $props()
</script>

<Button
  {href}
  onclick={async (e) => {
    e.preventDefault()

    const result = await preloadData(href)

    if (result.type === 'loaded' && result.status === 200) {
      pushState(href, { loaderData: result.data } as App.PageState<T>)
    } else {
    }
  }}
  {title}
  {...props}
>
  {@render children()}
</Button>
