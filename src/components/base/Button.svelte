<script lang="ts">
  import { ButtonStyles } from '$lib/theme/pallette'
  import type { ButtonProps } from '$lib/types/components/base/ButtonProps'

  let {
    children,
    title,
    type = 'button',
    name,
    enabled,
    style,
    onClick,
    startIcon,
    endIcon,
  }: ButtonProps = $props()

  let buttonStyle = ButtonStyles[style ?? 'primary']
</script>

<button
  class="p-2 m-2 cursor-pointer border-2 rounded-md {buttonStyle}"
  onclick={(e) => (onClick ? onClick(e) : undefined)}
  disabled={!enabled}
  {type}
  name={name ? name : ''}
  {title}
>
  {@render startIcon?.()}
  {@render children?.()}
  {@render endIcon?.()}
</button>
