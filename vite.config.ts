import { defineConfig } from "vite"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          // @ts-ignore
          app: resolve(__dirname, "index.html"),
        },
      },
    },
  }
})
