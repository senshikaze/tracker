import type { Style } from '$lib/types/definitions/Style'
import type { Common } from '../base/Common'
import type { FormError } from './FormError'

export interface TextInputProps extends Common {
  name: string
  label?: string
  type?: 'text' | 'number' | 'email'
  value?: string | number
  title?: string
  placeholder?: string
  style?: Style
  required?: boolean
  error?: FormError
  dirty?: boolean
  valid?: boolean
  inputSx?: string
  onInput?: (e: Event) => void
}
