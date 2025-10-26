export interface FormError {
  isError: boolean,
  message?: string,
  fields?: {
    [fieldName: string]: {
      missing?: boolean
      invalid?: boolean,
      message?: string
    }
  }
}