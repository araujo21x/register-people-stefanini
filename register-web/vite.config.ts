import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/view/components"),
      "@pages": path.resolve(__dirname, "src/view/pages"),
      "@layouts": path.resolve(__dirname, "src/view/layouts"),
      "@styles": path.resolve(__dirname, "src/view/styles"),
      "@hooks": path.resolve(__dirname, "src/app/hooks"),
      "@utils": path.resolve(__dirname, "src/app/utils"),
      "@libs": path.resolve(__dirname, "src/app/libs"),
      "@context": path.resolve(__dirname, "src/app/context"),
      "@app": path.resolve(__dirname, "src/app"),
      "@view": path.resolve(__dirname, "src/view"),
      
    },
  },
})
