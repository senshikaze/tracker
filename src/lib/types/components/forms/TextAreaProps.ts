import type { FormError } from "./FormError"

export interface TextAreaProps {
  name: string
  label: string
  value?: string
  placeholder?: string
  title?: string
  style?: string
  required?: boolean
  error?: FormError
  dirty?: boolean
  valid?: boolean
  onInput?: (e: Event) => void
}