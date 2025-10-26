interface PaletteStyles {
  danger: string
  error: string
  info: string
  primary: string
  warning: string
}
export const ButtonStyles: PaletteStyles = {
  danger:
    ' dark:bg-red-300 dark:border-bg-red-500 dark:text-red-900 bg-red-800 border-red-600 text-red-300',
  error:
    ' dark:bg-red-300 dark:border-bg-red-500 dark:text-red-900 bg-red-800 border-red-600 text-red-300',
  info: ' dark:bg-gray-200 dark:border-bg-gray-400 dark:text-gray-900 bg-gray-800 border-gray-600',
  primary:
    ' dark:bg-gray-200 dark:border-bg-gray-400 dark:text-gray-900 bg-gray-800 border-gray-600',
  warning:
    ' dark:bg-gray-200 dark:border-bg-gray-400 dark:text-gray-900 bg-gray-800 border-gray-600',
}

export const TextInputStyles: PaletteStyles = {
  danger: ` dark:text-gray-800 dark:bg-gray-300 dark:border-red-500 border-red-600`,
  error: ` dark:text-gray-800 dark:bg-gray-300 dark:border-red-500 border-red-600`,
  info: ` dark:text-gray-800 dark:bg-gray-300 dark:border-gray-500 border-gray-600`,
  primary: ` dark:text-gray-800 dark:bg-gray-300 dark:border-gray-500 border-gray-600`,
  warning: `dark:text-gray-800 dark:bg-gray-300 dark:border-gray-500 border-gray-600`,
}
