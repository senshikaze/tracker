/** @type {import('@sveltejs/kit').Config} */
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const config = {
  kit: {
    alias: {
      $lib: 'src/lib',
    },
  },
  preprocess: vitePreprocess({ script: true }),
}

export default config
