<script lang="ts">
  import type { TextAreaProps } from "$lib/types/components/forms/TextAreaProps"

  let { name, label, value, title, style, error, onInput }: TextAreaProps =
    $props()

  let textareaStyle = $state(
    "dark:text-gray-800 dark:bg-gray-200 dark:border-border-gray-400 border-gray-600",
  )

  if (style) {
    textareaStyle += ` ${style}`
  }

  if (error && error?.fields?.[name]) {
    textareaStyle += " border-red-300!"
  }

  function oninput(e: Event) {
    onInput ? onInput(e) : undefined
  }
</script>

<div class="flex flex-col">
  <label for={name}>{label}</label>
  <textarea
    class="p-2 m-2 rounded-md border-2 {textareaStyle}"
    {name}
    {title}
    {oninput}
  >
    {value}
  </textarea>
  {#if error && error.fields?.[name]}
    <p class="text-red-300">{error.fields?.[name].message}</p>
  {/if}
</div>
