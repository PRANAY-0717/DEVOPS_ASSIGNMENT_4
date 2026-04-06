import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base if deploying to GitHub Pages (e.g., /repo-name/)
  base: '/DEVOPS_ASSIGNMENT_4/',
})
