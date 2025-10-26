import type { Style } from '$lib/types/definitions/Style'
import type { Snippet } from 'svelte'

export interface ButtonProps {
  children?: Snippet
  title?: string
  name?: string
  enabled?: boolean
  type?: 'button' | 'reset' | 'submit'
  onClick?: (e: MouseEvent) => void
  style?: Style
  startIcon?: Snippet
  endIcon?: Snippet
}
