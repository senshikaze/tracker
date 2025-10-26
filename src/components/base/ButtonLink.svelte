<script lang="ts">
  import type { ButtonLinkProps } from '$lib/types/components/base/ButtonLinkProps'
  import Button from './Button.svelte'

  let { href, title, ...buttonProps }: ButtonLinkProps = $props()
</script>

<a {href} {title}>
  <Button {title} {...buttonProps} />
</a>
