<script lang="ts">
  import Button from '$components/base/Button.svelte'
  import type { SubmitButtonProps } from '$lib/types/components/forms/SubmitButtonProps'

  let { ...buttonProps }: SubmitButtonProps = $props()
</script>

<Button type="submit" {...buttonProps} />
