<script lang="ts">
  import { TextInputStyles } from '$lib/theme/pallette'
  import type { TextInputProps } from '$lib/types/components/forms/TextInputProps'

  let {
    name,
    label,
    type = 'text',
    title,
    value,
    placeholder,
    style,
    error,
    sx,
    onInput,
  }: TextInputProps = $props()

  let inputStyle = TextInputStyles[style ?? 'primary']
  let errorStyle = error?.fields?.[name] ? 'border-red-300!' : ''

  function oninput(e: Event) {
    if (error?.fields?.[name]) {
      delete error.fields?.[name]
    }
    onInput ? onInput(e) : undefined
  }
</script>

<div class="flex flex-col {sx}">
  {#if label}<label for={name}>{label}</label>{/if}
  <input
    class="w-auto p-2 m-2 border-2 rounded-md {inputStyle} {errorStyle}"
    id={name}
    {...{ type, placeholder, name, value, title, oninput }}
  />
  {#if error?.fields?.[name]}
    <p class="text-red-300">{error.fields?.[name].message}</p>
  {/if}
</div>
