<script lang="ts">
  import type { IconProps } from '$lib/types/components/icons/IconProps'

  let { classes = '' }: IconProps = $props()
</script>

<svg
  class="size-6 inline-block {classes}"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M12 4.5v15m7.5-7.5h-15"
  />
</svg>
